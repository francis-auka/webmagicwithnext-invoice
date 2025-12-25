import { ProposalData } from '@/types/proposal';

export const generateProposalNumber = (): string => {
    const prefix = 'PROP';
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}${month}-${random}`;
};

export const createEmptyProposal = (): ProposalData => ({
    proposalNumber: generateProposalNumber(),
    issueDate: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    client: {
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
    },
    projectOverview: '',
    scopeItems: [
        {
            id: crypto.randomUUID(),
            description: '',
            deliverable: '',
        },
    ],
    excludedWork: '',
    timeline: '',
    generalRequirements: '',
    currency: 'KES',
    notes: '',
});
