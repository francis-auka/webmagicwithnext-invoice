import React from 'react';
import { ProposalData } from '@/types/proposal';
import { formatCurrency, formatDate } from '@/lib/invoice-utils';
import logo from '@/assets/logo.png';

interface ProposalPreviewProps {
    proposal: ProposalData;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ proposal }) => {
    return (
        <div
            id="proposal-preview"
            className="proposal-preview bg-card rounded-xl shadow-elevated p-6 sm:p-8 w-full max-w-[800px] mx-auto overflow-hidden"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center">
                    <img src={logo} alt="webmagicwithnext" className="h-20 sm:h-24 w-auto print:h-20" />
                </div>
                <div className="text-center sm:text-right">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">PROPOSAL</h1>
                    <p className="text-sm font-mono text-muted-foreground mt-2">{proposal.proposalNumber}</p>
                </div>
            </div>

            {/* Dates & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Prepared For</h3>
                    <div className="text-sm space-y-1">
                        <p className="font-semibold text-foreground">{proposal.client.name || 'Client Name'}</p>
                        {proposal.client.company && <p className="text-muted-foreground">{proposal.client.company}</p>}
                        {proposal.client.email && <p className="text-muted-foreground">{proposal.client.email}</p>}
                        {proposal.client.phone && <p className="text-muted-foreground">{proposal.client.phone}</p>}
                        {proposal.client.address && (
                            <p className="text-muted-foreground whitespace-pre-line">{proposal.client.address}</p>
                        )}
                    </div>
                </div>
                <div className="sm:text-right">
                    <div className="inline-block text-left sm:text-right">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <span className="text-muted-foreground">Issue Date:</span>
                            <span className="font-medium">{formatDate(proposal.issueDate)}</span>
                            <span className="text-muted-foreground">Valid Until:</span>
                            <span className="font-medium">{formatDate(proposal.validUntil)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Overview */}
            {proposal.projectOverview && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">Project Overview</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{proposal.projectOverview}</p>
                </div>
            )}

            {/* Scope of Work */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">Scope of Work</h2>
                <div className="space-y-4">
                    {proposal.scopeItems.map((item) => (
                        <div key={item.id} className="text-sm">
                            <p className="font-semibold text-foreground">{item.description || 'Task Description'}</p>
                            {item.deliverable && (
                                <p className="text-muted-foreground mt-1">
                                    <span className="font-medium">Deliverable:</span> {item.deliverable}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Excluded Work */}
            {proposal.excludedWork && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">Excluded Work</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{proposal.excludedWork}</p>
                </div>
            )}

            {/* Timeline */}
            {proposal.timeline && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">Timeline</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{proposal.timeline}</p>
                </div>
            )}

            {/* General Requirements */}
            {proposal.generalRequirements && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">General Requirements</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{proposal.generalRequirements}</p>
                </div>
            )}

            {/* Notes */}
            {proposal.notes && (
                <div className="mt-auto pt-6 border-t border-border">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Additional Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{proposal.notes}</p>
                </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-border text-center">
                Thank you for considering our proposal! • webmagicwithnext.vercel.app

            </div>
        </div>
    );
};
