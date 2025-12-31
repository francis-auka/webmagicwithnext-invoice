import React from 'react';
import { AuditData } from '@/types/audit';
import { formatDate } from '@/lib/invoice-utils';
import logo from '@/assets/logo.png';
import { Badge } from '@/components/ui/badge';

interface AuditPreviewProps {
    audit: AuditData;
}

export const AuditPreview: React.FC<AuditPreviewProps> = ({ audit }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'High':
                return 'destructive';
            case 'Medium':
                return 'default'; // or secondary/warning if available, but default is usually primary
            case 'Low':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <div
            id="audit-preview"
            className="audit-preview bg-card rounded-xl shadow-elevated p-6 sm:p-8 w-full max-w-[800px] mx-auto overflow-hidden"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center">
                    <img src={logo} alt="webmagicwithnext" className="h-20 sm:h-24 w-auto print:h-20" />
                </div>
                <div className="text-center sm:text-right">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">AUDIT REPORT</h1>
                    <p className="text-sm font-mono text-muted-foreground mt-2">{audit.auditNumber}</p>
                </div>
            </div>

            {/* Dates & Client */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Client Details</h3>
                    <div className="text-sm space-y-1">
                        <p className="font-semibold text-foreground">{audit.client.name || 'Client Name'}</p>
                        {audit.client.company && <p className="text-muted-foreground">{audit.client.company}</p>}
                        {audit.client.email && <p className="text-muted-foreground break-all">{audit.client.email}</p>}
                        {audit.client.website && (
                            <p className="text-primary underline break-all">
                                <a href={audit.client.website} target="_blank" rel="noopener noreferrer">
                                    {audit.client.website}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
                <div className="sm:text-right">
                    <div className="inline-block w-full sm:w-auto text-left sm:text-right">
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{formatDate(audit.date)}</span>
                            <span className="text-muted-foreground">Total Issues:</span>
                            <span className="font-medium">{audit.issues.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Issues List */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-primary mb-4">Audit Findings</h3>
                <div className="space-y-6">
                    {audit.issues.map((issue, index) => (
                        <div key={issue.id} className="bg-muted/30 rounded-lg p-4 border border-border/50 break-inside-avoid">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-muted-foreground">#{index + 1}</span>
                                    <Badge variant="outline">{issue.category}</Badge>
                                </div>
                                <Badge variant={getSeverityColor(issue.severity) as any}>
                                    {issue.severity} Severity
                                </Badge>
                            </div>

                            <div className="space-y-3 mt-3">
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground mb-1">Observation</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{issue.description || 'No description provided.'}</p>
                                </div>

                                {issue.recommendation && (
                                    <div className="bg-background/50 p-3 rounded border border-border/50">
                                        <h4 className="text-sm font-semibold text-primary mb-1">Recommendation</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">{issue.recommendation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {audit.issues.length === 0 && (
                        <p className="text-center text-muted-foreground italic py-8">No issues recorded yet.</p>
                    )}
                </div>
            </div>

            {/* Notes */}
            {audit.notes && (
                <div className="mt-auto pt-6 border-t border-border break-inside-avoid">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Summary & Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{audit.notes}</p>
                </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                Generated by webmagicwithnext.vercel.app
            </div>
        </div>
    );
};
