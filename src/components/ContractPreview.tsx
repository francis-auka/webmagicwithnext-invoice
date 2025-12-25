import React from 'react';
import { ContractData } from '@/types/contract';
import { formatCurrency, formatDate } from '@/lib/invoice-utils';
import logo from '@/assets/logo.png';

interface ContractPreviewProps {
    contract: ContractData;
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({ contract }) => {
    return (
        <div
            id="contract-preview"
            className="contract-preview bg-card rounded-xl shadow-elevated p-6 sm:p-8 w-full max-w-[800px] mx-auto overflow-hidden"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center">
                    <img src={logo} alt="webmagicwithnext" className="h-20 sm:h-24 w-auto print:h-20" />
                </div>
                <div className="text-center sm:text-right">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">SERVICE AGREEMENT</h1>
                    <p className="text-sm font-mono text-muted-foreground mt-2">{contract.contractNumber}</p>
                </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Client (The "Client")</h3>
                    <div className="text-sm space-y-1">
                        <p className="font-semibold text-foreground">{contract.client.name || 'Client Name'}</p>
                        {contract.client.company && <p className="text-muted-foreground">{contract.client.company}</p>}
                        {contract.client.address && (
                            <p className="text-muted-foreground whitespace-pre-line">{contract.client.address}</p>
                        )}
                    </div>
                </div>
                <div className="sm:text-right">
                    <div className="inline-block text-left sm:text-right">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <span className="text-muted-foreground">Agreement Date:</span>
                            <span className="font-medium">{formatDate(contract.issueDate)}</span>
                            <span className="text-muted-foreground">Effective Date:</span>
                            <span className="font-medium">{formatDate(contract.effectiveDate)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Agreement */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">1. Services</h2>
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {contract.serviceAgreement || 'Description of services to be provided...'}
                </p>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">2. Terms & Conditions</h2>
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {contract.termsAndConditions || 'Legal terms and conditions...'}
                </p>
            </div>

            {/* Payment Terms */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">3. Payment</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                        <span className="text-sm font-semibold">Total Agreement Value:</span>
                        <span className="text-lg font-bold text-primary">{formatCurrency(contract.totalAmount, contract.currency)}</span>
                    </div>
                    {contract.paymentTerms && (
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                            {contract.paymentTerms}
                        </p>
                    )}
                </div>
            </div>

            {/* Ownership & IP */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">4. Ownership & Intellectual Property</h2>
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {contract.ownershipIP || 'Ownership terms...'}
                </p>
            </div>

            {/* Termination */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">5. Termination</h2>
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {contract.termination || 'Termination terms...'}
                </p>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">6. Governing Law</h2>
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {contract.governingLaw || 'Governing law terms...'}
                </p>
            </div>

            {/* Signatures */}
            <div className="mt-12 pt-12 border-t border-border">
                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="border-b border-foreground h-12 flex items-end pb-1">
                            <span className="font-signature text-2xl text-primary/80">{contract.client.name || 'Client Name'}</span>
                        </div>
                        <div className="text-xs">
                            <p className="font-bold uppercase">Client Signature</p>
                            <p className="text-muted-foreground mt-1">Date: ________________</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="border-b border-foreground h-12 flex items-end pb-1">
                            <span className="font-signature text-2xl text-primary/80">Francis Auka</span>
                        </div>
                        <div className="text-xs">
                            <p className="font-bold uppercase">Provider Signature</p>
                            <p className="text-muted-foreground mt-1">Date: ________________</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                    This document is a legally binding agreement. • webmagicwithnext.com
                </p>
            </div>
        </div>
    );
};
