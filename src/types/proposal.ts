import { ClientDetails } from './invoice';

export interface ProposalScopeItem {
    id: string;
    description: string;
    deliverable: string;
}

export interface ProposalCostItem {
    id: string;
    description: string;
    amount: number;
}

export interface ProposalData {
    proposalNumber: string;
    issueDate: Date;
    validUntil: Date;
    client: ClientDetails;
    projectOverview: string;
    scopeItems: ProposalScopeItem[];
    excludedWork: string;
    timeline: string;
    generalRequirements: string;
    currency: string;
    notes: string;
}
