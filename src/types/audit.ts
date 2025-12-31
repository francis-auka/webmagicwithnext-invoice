export interface AuditIssue {
    id: string;
    category: 'SEO' | 'Performance' | 'Security' | 'UI/UX' | 'Accessibility' | 'Content';
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    recommendation: string;
}

export interface ClientDetails {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
}

export interface AuditData {
    id: string;
    auditNumber: string;
    date: Date;
    client: ClientDetails;
    issues: AuditIssue[];
    notes: string;
    status: 'draft' | 'completed';
}
