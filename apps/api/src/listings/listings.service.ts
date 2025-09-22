import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto, UpdateListingDto, ListingStatus } from '@realtydirect/lib';

interface ListingFilters {
  page: number;
  limit: number;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  state?: string;
}

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, sellerId: string) {
    const { address, ...listingData } = createListingDto;

    const listing = await this.prisma.listing.create({
      data: {
        ...listingData,
        sellerId,
        address: address as any,
        status: ListingStatus.DRAFT,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return listing;
  }

  async findAll(filters: ListingFilters) {
    const { page, limit, status, minPrice, maxPrice, city, state } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }

    if (city || state) {
      where.address = {};
      if (city) where.address.path = ['city'];
      if (state) where.address.path = ['state'];
    }

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        skip,
        take: limit,
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        documents: {
          select: {
            id: true,
            templateName: true,
            fileName: true,
            signed: true,
            createdAt: true,
          },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async update(id: string, updateListingDto: UpdateListingDto, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.sellerId !== userId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    const { address, ...listingData } = updateListingDto;

    const updatedListing = await this.prisma.listing.update({
      where: { id },
      data: {
        ...listingData,
        ...(address && { address: address as any }),
        updatedAt: new Date(),
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return updatedListing;
  }

  async remove(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.sellerId !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    // Check if there are any active transactions
    const activeTransactions = await this.prisma.transaction.findMany({
      where: {
        listingId: id,
        status: {
          not: 'COMPLETED',
        },
      },
    });

    if (activeTransactions.length > 0) {
      throw new BadRequestException(
        'Cannot delete listing with active transactions',
      );
    }

    await this.prisma.listing.delete({
      where: { id },
    });

    return { message: 'Listing deleted successfully' };
  }

  async getImages(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return { images: listing.images };
  }

  async uploadImages(id: string, images: string[], userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.sellerId !== userId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    // Validate image URLs (basic validation)
    const validImages = images.filter((url) => {
      try {
        new URL(url);
        return url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      } catch {
        return false;
      }
    });

    if (validImages.length === 0) {
      throw new BadRequestException('No valid image URLs provided');
    }

    const updatedListing = await this.prisma.listing.update({
      where: { id },
      data: {
        images: validImages,
        updatedAt: new Date(),
      },
    });

    return { images: updatedListing.images };
  }
}
