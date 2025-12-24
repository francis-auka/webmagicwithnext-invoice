import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import logo from '@/assets/logo.png';

interface InvoiceHeaderProps {
  onNewInvoice: () => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ onNewInvoice }) => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="webmagicwithnext" className="h-11 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Invoice Generator
              </span>
              <span className="text-[10px] text-muted-foreground">
                Professional billing made simple
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onNewInvoice}>
              <FilePlus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
