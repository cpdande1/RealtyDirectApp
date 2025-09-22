import { CostBreakdown } from './types';

export function calculateMortgage(
  loanAmount: number,
  interestRate: number,
  loanTermMonths: number
): number {
  const monthlyRate = interestRate / 12;
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  return Math.round(monthlyPayment * 100) / 100;
}

export function calculateCostBreakdown(
  purchasePrice: number,
  downPayment: number,
  interestRate: number,
  loanTermYears: number = 30
): CostBreakdown {
  const loanAmount = purchasePrice - downPayment;
  const loanTermMonths = loanTermYears * 12;
  const monthlyPayment = calculateMortgage(loanAmount, interestRate, loanTermMonths);
  
  // Estimate closing costs as 2-5% of purchase price
  const closingCosts = purchasePrice * 0.03;
  const totalCost = purchasePrice + closingCosts;

  return {
    purchasePrice,
    downPayment,
    loanAmount,
    interestRate,
    loanTerm: loanTermYears,
    monthlyPayment,
    closingCosts,
    totalCost,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

