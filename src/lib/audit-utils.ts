import { AuditData } from '@/types/audit';

export const generateAuditNumber = (): string => {
    const prefix = 'AUD';
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}${month}-${random}`;
};

export const createEmptyAudit = (): AuditData => ({
    id: crypto.randomUUID(),
    auditNumber: generateAuditNumber(),
    date: new Date(),
    client: {
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
    },
    issues: [],
    notes: '',
    status: 'draft',
});
