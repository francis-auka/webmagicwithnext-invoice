import { ClientDetails } from './invoice';

export interface ContractData {
    contractNumber: string;
    issueDate: Date;
    effectiveDate: Date;
    client: ClientDetails;
    serviceAgreement: string;
    termsAndConditions: string;
    paymentTerms: string;
    ownershipIP: string;
    termination: string;
    governingLaw: string;
    currency: string;
    totalAmount: number;
    notes: string;
}
