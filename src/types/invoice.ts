export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  client: ClientDetails;
  lineItems: LineItem[];
  taxRate: number;
  discountPercent: number;
  currency: string;
  notes: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid';

export interface SavedInvoice extends InvoiceData {
  id: string;
  status: InvoiceStatus;
  createdAt: Date;
  total: number;
}
