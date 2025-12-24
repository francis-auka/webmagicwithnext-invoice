import React, { useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { InvoiceActions } from '@/components/InvoiceActions';
import { InvoiceHeader } from '@/components/InvoiceHeader';
import { InvoiceData } from '@/types/invoice';
import { createEmptyInvoice } from '@/lib/invoice-utils';

const Index = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(createEmptyInvoice);

  const handleNewInvoice = () => {
    setInvoice(createEmptyInvoice());
  };

  return (
    <div className="min-h-screen bg-background">
      <InvoiceHeader onNewInvoice={handleNewInvoice} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Invoice Details
              </h2>
              <InvoiceForm invoice={invoice} onChange={setInvoice} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Live Preview
                </h2>
                <InvoiceActions invoice={invoice} />
              </div>
              <div className="bg-muted/50 rounded-2xl p-2 sm:p-4 lg:p-6 overflow-x-auto">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
