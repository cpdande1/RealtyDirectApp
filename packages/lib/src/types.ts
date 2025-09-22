export enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  LENDER = 'LENDER',
  ADMIN = 'ADMIN'
}

export enum ListingStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SOLD = 'SOLD',
  WITHDRAWN = 'WITHDRAWN'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  OFFER_MADE = 'OFFER_MADE',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  UNDER_CONTRACT = 'UNDER_CONTRACT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  verified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description?: string;
  price: number;
  address: Address;
  images: string[];
  status: ListingStatus;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Transaction {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: TransactionStatus;
  offerAmount?: number;
  costBreakdown: CostBreakdown;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostBreakdown {
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  closingCosts: number;
  totalCost: number;
}

export interface Document {
  id: string;
  listingId?: string;
  ownerId: string;
  templateName: string;
  fileName: string;
  s3Key: string;
  fields: Record<string, any>;
  signed: boolean;
  signedAt?: Date;
  audit: Record<string, any>;
  createdAt: Date;
}

export interface AuditLog {
  id: number;
  userId?: string;
  action: string;
  resource: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}
