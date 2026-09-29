export type FeePlanType =
  | "Registration Fee"
  | "Monthly"
  | "Termly"
  | "3-Month Package"
  | "6-Month Package"
  | "Annual";

export type InvoiceStatus =
  | "Pending"
  | "Partially Paid"
  | "Paid"
  | "Overdue"
  | "Cancelled";

export type PaymentMethod =
  | "Cash"
  | "Bank Transfer"
  | "Card"
  | "POS"
  | "Online Payment";

export interface FeePlan {
  id: string;

  name: string;

  type: FeePlanType;

  amount: number;

  description?: string;

  program?: string;

  ageCategory?: string;

  active: boolean;

  createdAt: string;
}

export interface PlayerInvoice {
  id: string;

  invoiceNumber: string;

  playerId: string;

  feePlanId: string;

  description: string;

  amount: number;

  discountAmount: number;

  sponsorshipAmount: number;

  amountPaid: number;

  dueDate: string;

  status: InvoiceStatus;

  createdAt: string;
}

export interface Payment {
  id: string;

  paymentNumber: string;

  receiptNumber: string;

  playerId: string;

  invoiceId: string;

  amount: number;

  paymentMethod: PaymentMethod;

  paymentDate: string;

  reference?: string;

  notes?: string;

  recordedBy: string;

  createdAt: string;
}

export interface Discount {
  id: string;

  playerId: string;

  invoiceId?: string;

  title: string;

  amount: number;

  reason: string;

  createdAt: string;
}

export interface Sponsorship {
  id: string;

  playerId: string;

  sponsorName: string;

  amount: number;

  description?: string;

  startDate: string;

  endDate?: string;

  active: boolean;

  createdAt: string;
}

export interface Expense {
  id: string;

  title: string;

  category: string;

  amount: number;

  date: string;

  description?: string;

  createdAt: string;
}

export interface StaffPayment {
  id: string;

  staffId: string;

  staffName: string;

  amount: number;

  paymentDate: string;

  paymentType: string;

  reference?: string;

  createdAt: string;
}