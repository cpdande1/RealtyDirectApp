import { z } from 'zod';
import { Role, ListingStatus, TransactionStatus } from './types';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.nativeEnum(Role),
  phone: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const CreateListingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  images: z.array(z.string()).default([]),
  status: z.nativeEnum(ListingStatus).default(ListingStatus.DRAFT),
});

export const UpdateListingSchema = CreateListingSchema.partial();

export const CreateTransactionSchema = z.object({
  listingId: z.string().uuid('Invalid listing ID'),
  offerAmount: z.number().positive().optional(),
});

export const UpdateTransactionSchema = z.object({
  status: z.nativeEnum(TransactionStatus).optional(),
  offerAmount: z.number().positive().optional(),
});

export const CostBreakdownSchema = z.object({
  purchasePrice: z.number().positive(),
  downPayment: z.number().min(0),
  interestRate: z.number().min(0).max(1),
  loanTerm: z.number().positive(),
});

export const DocumentSchema = z.object({
  templateName: z.string().min(1, 'Template name is required'),
  fileName: z.string().min(1, 'File name is required'),
  fields: z.record(z.any()).default({}),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type CreateListingDto = z.infer<typeof CreateListingSchema>;
export type UpdateListingDto = z.infer<typeof UpdateListingSchema>;
export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
export type CostBreakdownDto = z.infer<typeof CostBreakdownSchema>;
export type DocumentDto = z.infer<typeof DocumentSchema>;
