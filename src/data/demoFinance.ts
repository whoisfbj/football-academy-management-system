import type {
  Discount,
  Expense,
  FeePlan,
  Payment,
  PlayerInvoice,
  Sponsorship,
  StaffPayment,
} from "../shared/types/finance";

export const demoFeePlans: FeePlan[] = [
  {
    id: "fee-001",
    name: "Player Registration Fee",
    type: "Registration Fee",
    amount: 25000,
    description:
      "One-time academy registration fee.",
    active: true,
    createdAt:
      "2026-01-01T08:00:00.000Z",
  },

  {
    id: "fee-002",
    name: "Monthly Training Fee",
    type: "Monthly",
    amount: 35000,
    description:
      "Monthly academy training fee.",
    active: true,
    createdAt:
      "2026-01-01T08:00:00.000Z",
  },

  {
    id: "fee-003",
    name: "3-Month Training Package",
    type: "3-Month Package",
    amount: 90000,
    description:
      "Three-month football development package.",
    active: true,
    createdAt:
      "2026-01-01T08:00:00.000Z",
  },

  {
    id: "fee-004",
    name: "6-Month Training Package",
    type: "6-Month Package",
    amount: 170000,
    active: true,
    createdAt:
      "2026-01-01T08:00:00.000Z",
  },

  {
    id: "fee-005",
    name: "Annual Academy Fee",
    type: "Annual",
    amount: 320000,
    active: true,
    createdAt:
      "2026-01-01T08:00:00.000Z",
  },
];

export const demoInvoices: PlayerInvoice[] = [
  {
    id: "invoice-001",
    invoiceNumber: "INV-2026-0001",

    playerId: "player-001",

    feePlanId: "fee-003",

    description:
      "3-Month Training Package",

    amount: 90000,

    discountAmount: 0,

    sponsorshipAmount: 0,

    amountPaid: 60000,

    dueDate: "2026-10-05",

    status: "Partially Paid",

    createdAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "invoice-002",
    invoiceNumber: "INV-2026-0002",

    playerId: "player-002",

    feePlanId: "fee-002",

    description:
      "September Monthly Training Fee",

    amount: 35000,

    discountAmount: 5000,

    sponsorshipAmount: 0,

    amountPaid: 30000,

    dueDate: "2026-09-10",

    status: "Paid",

    createdAt:
      "2026-09-01T09:30:00.000Z",
  },

  {
    id: "invoice-003",
    invoiceNumber: "INV-2026-0003",

    playerId: "player-003",

    feePlanId: "fee-002",

    description:
      "September Monthly Training Fee",

    amount: 35000,

    discountAmount: 0,

    sponsorshipAmount: 10000,

    amountPaid: 10000,

    dueDate: "2026-09-10",

    status: "Partially Paid",

    createdAt:
      "2026-09-01T10:00:00.000Z",
  },
];

export const demoPayments: Payment[] = [
  {
    id: "payment-001",

    paymentNumber: "PAY-2026-0001",

    receiptNumber: "REC-2026-0001",

    playerId: "player-001",

    invoiceId: "invoice-001",

    amount: 60000,

    paymentMethod: "Bank Transfer",

    paymentDate: "2026-09-05",

    reference:
      "TRF-ACADEMY-001",

    recordedBy: "admin-001",

    createdAt:
      "2026-09-05T11:00:00.000Z",
  },

  {
    id: "payment-002",

    paymentNumber: "PAY-2026-0002",

    receiptNumber: "REC-2026-0002",

    playerId: "player-002",

    invoiceId: "invoice-002",

    amount: 30000,

    paymentMethod: "POS",

    paymentDate: "2026-09-07",

    reference:
      "POS-30092",

    recordedBy: "admin-001",

    createdAt:
      "2026-09-07T12:00:00.000Z",
  },

  {
    id: "payment-003",

    paymentNumber: "PAY-2026-0003",

    receiptNumber: "REC-2026-0003",

    playerId: "player-003",

    invoiceId: "invoice-003",

    amount: 10000,

    paymentMethod: "Cash",

    paymentDate: "2026-09-08",

    recordedBy: "admin-001",

    createdAt:
      "2026-09-08T14:00:00.000Z",
  },
];

export const demoDiscounts: Discount[] = [
  {
    id: "discount-001",

    playerId: "player-002",

    invoiceId: "invoice-002",

    title: "Sibling Discount",

    amount: 5000,

    reason:
      "Approved academy sibling discount.",

    createdAt:
      "2026-09-01T10:00:00.000Z",
  },
];

export const demoSponsorships: Sponsorship[] = [
  {
    id: "sponsorship-001",

    playerId: "player-003",

    sponsorName:
      "Elite Youth Foundation",

    amount: 10000,

    description:
      "Monthly training support.",

    startDate:
      "2026-09-01",

    active: true,

    createdAt:
      "2026-09-01T09:00:00.000Z",
  },
];

export const demoExpenses: Expense[] = [
  {
    id: "expense-001",

    title:
      "Training Equipment",

    category:
      "Equipment",

    amount: 145000,

    date: "2026-09-12",

    description:
      "Football cones, bibs and training balls.",

    createdAt:
      "2026-09-12T10:00:00.000Z",
  },

  {
    id: "expense-002",

    title:
      "Training Centre Maintenance",

    category:
      "Facility",

    amount: 75000,

    date: "2026-09-18",

    createdAt:
      "2026-09-18T10:00:00.000Z",
  },
];

export const demoStaffPayments: StaffPayment[] = [
  {
    id: "staff-payment-001",

    staffId: "coach-001",

    staffName:
      "Michael Johnson",

    amount: 180000,

    paymentDate:
      "2026-09-25",

    paymentType:
      "Monthly Salary",

    reference:
      "SAL-SEP-001",

    createdAt:
      "2026-09-25T10:00:00.000Z",
  },
];