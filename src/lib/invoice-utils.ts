import { InvoiceData, LineItem } from '@/types/invoice';

export const generateInvoiceNumber = (): string => {
  const prefix = 'WMN';
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${year}${month}-${random}`;
};

export const calculateLineTotal = (item: LineItem): number => {
  return item.rate;
};

export const calculateSubtotal = (items: LineItem[]): number => {
  return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateDiscount = (subtotal: number, discountPercent: number): number => {
  return subtotal * (discountPercent / 100);
};

export const calculateTotal = (
  items: LineItem[],
  taxRate: number,
  discountPercent: number
): number => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  const discount = calculateDiscount(subtotal, discountPercent);
  return subtotal + tax - discount;
};

export const formatCurrency = (amount: number, currency: string): string => {
  const currencyMap: Record<string, { locale: string; code: string }> = {
    KES: { locale: 'en-KE', code: 'KES' },
    USD: { locale: 'en-US', code: 'USD' },
    EUR: { locale: 'de-DE', code: 'EUR' },
    GBP: { locale: 'en-GB', code: 'GBP' },
  };

  const config = currencyMap[currency] || currencyMap.KES;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const createEmptyInvoice = (): InvoiceData => ({
  invoiceNumber: generateInvoiceNumber(),
  issueDate: new Date(),
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  client: {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  },
  lineItems: [
    {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      rate: 0,
    },
  ],
  taxRate: 0,
  discountPercent: 0,
  currency: 'KES',
  notes: `PAYMENT INFORMATION:
Equity Business Number: 247247
Equity Paybill Account: 1170184512866
Mpesa Number: 0795544180
Name: Francis Auka`,
});
