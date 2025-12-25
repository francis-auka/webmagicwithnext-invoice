import React, { useState } from 'react';
import { ContractForm } from '@/components/ContractForm';
import { ContractPreview } from '@/components/ContractPreview';
import { ContractActions } from '@/components/ContractActions';
import { InvoiceHeader } from '@/components/InvoiceHeader';
import { ContractData } from '@/types/contract';
import { createEmptyContract } from '@/lib/contract-utils';

const Contracts = () => {
    const [contract, setContract] = useState<ContractData>(createEmptyContract);

    const handleNewContract = () => {
        setContract(createEmptyContract());
    };

    return (
        <div className="min-h-screen bg-background">
            <InvoiceHeader onNewInvoice={handleNewContract} />

            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="order-2 lg:order-1">
                        <div className="lg:sticky lg:top-24">
                            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-accent rounded-full"></span>
                                Contract Details
                            </h2>
                            <ContractForm contract={contract} onChange={setContract} />
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
                                <ContractActions contract={contract} />
                            </div>
                            <div className="bg-muted/50 rounded-2xl p-2 sm:p-4 lg:p-6 overflow-x-auto">
                                <ContractPreview contract={contract} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contracts;
