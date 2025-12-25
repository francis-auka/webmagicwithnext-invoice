import React from 'react';
import { InvoiceData } from '@/types/invoice';
import {
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal,
  formatCurrency,
  formatDate,
} from '@/lib/invoice-utils';
import logo from '@/assets/logo.png';

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  const subtotal = calculateSubtotal(invoice.lineItems);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const discount = calculateDiscount(subtotal, invoice.discountPercent);
  const total = calculateTotal(invoice.lineItems, invoice.taxRate, invoice.discountPercent);

  return (
    <div
      id="invoice-preview"
      className="invoice-preview bg-card rounded-xl shadow-elevated p-6 sm:p-8 w-full max-w-[800px] mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-border">
        <div className="flex items-center">
          <img src={logo} alt="webmagicwithnext" className="h-20 sm:h-24 w-auto print:h-20" />
        </div>
        <div className="text-center sm:text-right">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">INVOICE</h1>
          <p className="text-sm font-mono text-muted-foreground mt-2">{invoice.invoiceNumber}</p>
        </div>
      </div>

      {/* Dates & Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Bill To</h3>
          <div className="text-sm space-y-1">
            <p className="font-semibold text-foreground">{invoice.client.name || 'Client Name'}</p>
            {invoice.client.company && <p className="text-muted-foreground">{invoice.client.company}</p>}
            {invoice.client.email && <p className="text-muted-foreground break-all">{invoice.client.email}</p>}
            {invoice.client.phone && <p className="text-muted-foreground">{invoice.client.phone}</p>}
            {invoice.client.address && (
              <p className="text-muted-foreground whitespace-pre-line">{invoice.client.address}</p>
            )}
          </div>
        </div>
        <div className="sm:text-right">
          <div className="inline-block w-full sm:w-auto text-left sm:text-right">
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
              <span className="text-muted-foreground">Issue Date:</span>
              <span className="font-medium">{formatDate(invoice.issueDate)}</span>
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{formatDate(invoice.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8 overflow-x-auto -mx-6 sm:mx-0">
        <div className="min-w-[600px] px-6 sm:px-0">
          <div className="bg-primary text-primary-foreground rounded-t-lg px-6 py-4">
            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wide">
              <div className="flex-1 min-w-0">Description</div>
              <div className="w-32 text-right shrink-0">Rate</div>
              <div className="w-32 text-right shrink-0">Amount</div>
            </div>
          </div>
          <div className="border border-t-0 border-border rounded-b-lg divide-y divide-border">
            {invoice.lineItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-between items-center px-6 py-5 text-sm ${index % 2 === 1 ? 'bg-muted/30' : ''
                  }`}
              >
                <div className="flex-1 min-w-0 font-medium pr-4 break-words">{item.description || 'Service'}</div>
                <div className="w-32 text-right text-muted-foreground shrink-0">
                  {formatCurrency(item.rate, invoice.currency)}
                </div>
                <div className="w-32 text-right font-medium shrink-0">
                  {formatCurrency(item.rate, invoice.currency)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal, invoice.currency)}</span>
          </div>
          {invoice.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span className="font-medium">{formatCurrency(tax, invoice.currency)}</span>
            </div>
          )}
          {invoice.discountPercent > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount ({invoice.discountPercent}%)</span>
              <span className="font-medium text-accent">-{formatCurrency(discount, invoice.currency)}</span>
            </div>
          )}
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(total, invoice.currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-auto pt-6 border-t border-border">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Notes</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Thank you for your business! • webmagicwithnext.com
        </p>
      </div>
    </div>
  );
};
