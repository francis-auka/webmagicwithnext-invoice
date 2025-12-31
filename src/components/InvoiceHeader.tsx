import React from 'react';
import { Button } from '@/components/ui/button';
import { FilePlus, FileText, Briefcase, ShieldCheck, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

interface InvoiceHeaderProps {
  onNewInvoice: () => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ onNewInvoice }) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/proposals') return 'Proposal Generator';
    if (location.pathname === '/contracts') return 'Contract Generator';
    if (location.pathname === '/audits') return 'Audit Report Generator';
    return 'Invoice Generator';
  };

  const getNewButtonText = () => {
    if (location.pathname === '/proposals') return 'New Proposal';
    if (location.pathname === '/contracts') return 'New Contract';
    if (location.pathname === '/audits') return 'New Audit';
    return 'New Invoice';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="webmagicwithnext" className="h-10 w-auto" />
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {getPageTitle()}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Professional docs made simple
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden sm:flex items-center gap-1">
              <Link to="/">
                <Button variant={isActive('/') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Invoices
                </Button>
              </Link>
              <Link to="/proposals">
                <Button variant={isActive('/proposals') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Proposals
                </Button>
              </Link>
              <Link to="/contracts">
                <Button variant={isActive('/contracts') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Contracts
                </Button>
              </Link>
              <Link to="/audits">
                <Button variant={isActive('/audits') ? 'secondary' : 'ghost'} size="sm" className="gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Audits
                </Button>
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onNewInvoice} className="hidden xs:flex">
              <FilePlus className="h-4 w-4 mr-2" />
              {getNewButtonText()}
            </Button>
            {/* Mobile Nav Toggle could go here if needed, but for now let's keep it simple */}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex sm:hidden items-center justify-around py-2 border-t border-border/50">
          <Link to="/">
            <Button variant={isActive('/') ? 'secondary' : 'ghost'} size="sm" className="px-2">
              <FileText className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/proposals">
            <Button variant={isActive('/proposals') ? 'secondary' : 'ghost'} size="sm" className="px-2">
              <Briefcase className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contracts">
            <Button variant={isActive('/contracts') ? 'secondary' : 'ghost'} size="sm" className="px-2">
              <ShieldCheck className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/audits">
            <Button variant={isActive('/audits') ? 'secondary' : 'ghost'} size="sm" className="px-2">
              <ClipboardList className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={onNewInvoice} className="px-2">
            <FilePlus className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};
