export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ENABLE_2FA: '/api/auth/2fa/enable',
    VERIFY_2FA: '/api/auth/2fa/verify',
  },
  LISTINGS: {
    LIST: '/api/listings',
    CREATE: '/api/listings',
    GET: (id: string) => `/api/listings/${id}`,
    UPDATE: (id: string) => `/api/listings/${id}`,
    DELETE: (id: string) => `/api/listings/${id}`,
  },
  TRANSACTIONS: {
    LIST: '/api/transactions',
    CREATE: '/api/transactions',
    GET: (id: string) => `/api/transactions/${id}`,
    UPDATE: (id: string) => `/api/transactions/${id}`,
    MAKE_OFFER: (id: string) => `/api/transactions/${id}/offer`,
  },
  DOCUMENTS: {
    GENERATE: '/api/documents/generate',
    GET: (id: string) => `/api/documents/${id}`,
    UPLOAD: '/api/documents/upload',
  },
  PAYMENTS: {
    CHECKOUT: '/api/payments/checkout',
    WEBHOOK: '/api/payments/webhook',
  },
  MORTGAGE: {
    PREAPPROVAL: '/api/mortgage/preapproval',
    CALCULATE: '/api/mortgage/calculate',
  },
  SIGNATURES: {
    REQUEST: '/api/signatures/request',
    WEBHOOK: '/api/signatures/webhook',
  },
  NOTIFICATIONS: {
    EMAIL: '/api/notifications/email',
  },
  AI: {
    REVIEW_DOCUMENT: '/api/ai/review-document',
    SUGGEST_COUNTER: '/api/ai/suggest-counter',
  },
} as const;

export const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  LENDER: 'LENDER',
  ADMIN: 'ADMIN',
} as const;

export const LISTING_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  SOLD: 'SOLD',
  WITHDRAWN: 'WITHDRAWN',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  OFFER_MADE: 'OFFER_MADE',
  OFFER_ACCEPTED: 'OFFER_ACCEPTED',
  UNDER_CONTRACT: 'UNDER_CONTRACT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const DOCUMENT_TEMPLATES = {
  PURCHASE_AGREEMENT: 'purchase_agreement',
  DISCLOSURE: 'disclosure',
  INSPECTION_REPORT: 'inspection_report',
  APPRAISAL: 'appraisal',
  TITLE_REPORT: 'title_report',
} as const;

export const DEFAULT_CONFIG = {
  INTEREST_RATE: 0.065, // 6.5%
  LOAN_TERM_YEARS: 30,
  CLOSING_COSTS_PERCENTAGE: 0.03, // 3%
  MIN_DOWN_PAYMENT_PERCENTAGE: 0.05, // 5%
} as const;
