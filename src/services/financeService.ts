import {
  demoDiscounts,
  demoExpenses,
  demoFeePlans,
  demoInvoices,
  demoPayments,
  demoSponsorships,
  demoStaffPayments,
} from "../data/demoFinance";

import type {
  Discount,
  Expense,
  FeePlan,
  Payment,
  PlayerInvoice,
  Sponsorship,
  StaffPayment,
} from "../shared/types/finance";

const FEE_PLANS_KEY =
  "academy_fee_plans";

const INVOICES_KEY =
  "academy_invoices";

const PAYMENTS_KEY =
  "academy_payments";

const DISCOUNTS_KEY =
  "academy_discounts";

const SPONSORSHIPS_KEY =
  "academy_sponsorships";

const EXPENSES_KEY =
  "academy_expenses";

const STAFF_PAYMENTS_KEY =
  "academy_staff_payments";

function initializeFinanceData() {
  if (
    !localStorage.getItem(
      FEE_PLANS_KEY,
    )
  ) {
    localStorage.setItem(
      FEE_PLANS_KEY,
      JSON.stringify(
        demoFeePlans,
      ),
    );
  }

  if (
    !localStorage.getItem(
      INVOICES_KEY,
    )
  ) {
    localStorage.setItem(
      INVOICES_KEY,
      JSON.stringify(
        demoInvoices,
      ),
    );
  }

  if (
    !localStorage.getItem(
      PAYMENTS_KEY,
    )
  ) {
    localStorage.setItem(
      PAYMENTS_KEY,
      JSON.stringify(
        demoPayments,
      ),
    );
  }

  if (
    !localStorage.getItem(
      DISCOUNTS_KEY,
    )
  ) {
    localStorage.setItem(
      DISCOUNTS_KEY,
      JSON.stringify(
        demoDiscounts,
      ),
    );
  }

  if (
    !localStorage.getItem(
      SPONSORSHIPS_KEY,
    )
  ) {
    localStorage.setItem(
      SPONSORSHIPS_KEY,
      JSON.stringify(
        demoSponsorships,
      ),
    );
  }

  if (
    !localStorage.getItem(
      EXPENSES_KEY,
    )
  ) {
    localStorage.setItem(
      EXPENSES_KEY,
      JSON.stringify(
        demoExpenses,
      ),
    );
  }

  if (
    !localStorage.getItem(
      STAFF_PAYMENTS_KEY,
    )
  ) {
    localStorage.setItem(
      STAFF_PAYMENTS_KEY,
      JSON.stringify(
        demoStaffPayments,
      ),
    );
  }
}

function parseStorage<T>(
  key: string,
): T[] {
  initializeFinanceData();

  try {
    return JSON.parse(
      localStorage.getItem(
        key,
      ) || "[]",
    ) as T[];
  } catch {
    return [];
  }
}

export function getFeePlans(): FeePlan[] {
  return parseStorage<FeePlan>(
    FEE_PLANS_KEY,
  );
}

export function getInvoices(): PlayerInvoice[] {
  return parseStorage<PlayerInvoice>(
    INVOICES_KEY,
  );
}

export function getPayments(): Payment[] {
  return parseStorage<Payment>(
    PAYMENTS_KEY,
  );
}

export function getDiscounts(): Discount[] {
  return parseStorage<Discount>(
    DISCOUNTS_KEY,
  );
}

export function getSponsorships(): Sponsorship[] {
  return parseStorage<Sponsorship>(
    SPONSORSHIPS_KEY,
  );
}

export function getExpenses(): Expense[] {
  return parseStorage<Expense>(
    EXPENSES_KEY,
  );
}

export function getStaffPayments(): StaffPayment[] {
  return parseStorage<StaffPayment>(
    STAFF_PAYMENTS_KEY,
  );
}

export function getInvoicesByPlayer(
  playerId: string,
) {
  return getInvoices().filter(
    (invoice) =>
      invoice.playerId ===
      playerId,
  );
}

export function getPaymentsByPlayer(
  playerId: string,
) {
  return getPayments().filter(
    (payment) =>
      payment.playerId ===
      playerId,
  );
}

export function getInvoiceById(
  id: string,
) {
  return getInvoices().find(
    (invoice) =>
      invoice.id === id,
  );
}

export function getPaymentById(
  id: string,
): Payment | undefined {
  return getPayments().find(
    (payment) =>
      payment.id === id,
  );
}



export function addPayment(
  payment: Payment,
) {
  const payments =
    getPayments();

  localStorage.setItem(
    PAYMENTS_KEY,
    JSON.stringify([
      ...payments,
      payment,
    ]),
  );

  const invoices =
    getInvoices();

  const updatedInvoices =
    invoices.map(
      (invoice) => {
        if (
          invoice.id !==
          payment.invoiceId
        ) {
          return invoice;
        }

        const newPaid =
          invoice.amountPaid +
          payment.amount;

        const payable =
          invoice.amount -
          invoice.discountAmount -
          invoice.sponsorshipAmount;

        return {
          ...invoice,

          amountPaid:
            newPaid,

          status:
            newPaid >= payable
              ? "Paid"
              : "Partially Paid",
        } as PlayerInvoice;
      },
    );

  localStorage.setItem(
    INVOICES_KEY,
    JSON.stringify(
      updatedInvoices,
    ),
  );
}

export function generatePaymentNumber() {
  const year =
    new Date().getFullYear();

  const sequence =
    getPayments().length + 1;

  return `PAY-${year}-${String(
    sequence,
  ).padStart(4, "0")}`;
}

export function generateReceiptNumber() {
  const year =
    new Date().getFullYear();

  const sequence =
    getPayments().length + 1;

  return `REC-${year}-${String(
    sequence,
  ).padStart(4, "0")}`;
}

export function addInvoice(
  invoice: PlayerInvoice,
) {
  const invoices =
    getInvoices();

  localStorage.setItem(
    INVOICES_KEY,
    JSON.stringify([
      ...invoices,
      invoice,
    ]),
  );
}

export function generateInvoiceNumber() {
  const year =
    new Date().getFullYear();

  const invoices =
    getInvoices();

  const currentYearInvoices =
    invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.startsWith(
          `INV-${year}-`,
        ),
    );

  const sequences =
    currentYearInvoices
      .map((invoice) => {
        const parts =
          invoice.invoiceNumber.split(
            "-",
          );

        return Number(
          parts[2],
        );
      })
      .filter(
        (value) =>
          !Number.isNaN(
            value,
          ),
      );

  const nextSequence =
    sequences.length > 0
      ? Math.max(
          ...sequences,
        ) + 1
      : 1;

  return `INV-${year}-${String(
    nextSequence,
  ).padStart(4, "0")}`;
}

export function getPaymentsByInvoice(
  invoiceId: string,
) {
  return getPayments().filter(
    (payment) =>
      payment.invoiceId === invoiceId,
  );
}

export function addExpense(
  expense: Expense,
) {
  localStorage.setItem(
    EXPENSES_KEY,
    JSON.stringify([
      ...getExpenses(),
      expense,
    ]),
  );
}

export function addSponsorship(
  sponsorship: Sponsorship,
) {
  localStorage.setItem(
    SPONSORSHIPS_KEY,
    JSON.stringify([
      ...getSponsorships(),
      sponsorship,
    ]),
  );
}

export function addStaffPayment(
  payment: StaffPayment,
) {
  localStorage.setItem(
    STAFF_PAYMENTS_KEY,
    JSON.stringify([
      ...getStaffPayments(),
      payment,
    ]),
  );
}

export function addDiscount(
  discount: Discount,
) {
  localStorage.setItem(
    DISCOUNTS_KEY,
    JSON.stringify([
      ...getDiscounts(),
      discount,
    ]),
  );
}

export function getInvoiceBalance(
  invoice: PlayerInvoice,
) {
  const payable =
    invoice.amount -
    invoice.discountAmount -
    invoice.sponsorshipAmount;

  return Math.max(
    payable -
      invoice.amountPaid,
    0,
  );
}