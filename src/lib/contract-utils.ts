import { ContractData } from '@/types/contract';

export const generateContractNumber = (): string => {
    const prefix = 'CONT';
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}${month}-${random}`;
};

export const createEmptyContract = (): ContractData => ({
    contractNumber: generateContractNumber(),
    issueDate: new Date(),
    effectiveDate: new Date(),
    client: {
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
    },
    serviceAgreement: '',
    termsAndConditions: `The Client agrees to provide all necessary content, materials, and feedback required to complete the project in a timely manner.
Delays caused by late responses, missing assets, or changes requested outside the agreed scope may result in timeline extensions and additional costs.
The Service Provider will perform the services with reasonable skill and care but does not guarantee specific business outcomes, including revenue or user growth.`,
    paymentTerms: `The Client agrees to pay the Service Provider the total project fee as outlined in the invoice.
A deposit may be required before work begins. The remaining balance shall be paid upon completion of the project or according to agreed milestones.
All payments must be made within the specified invoice due date. Late payments may result in paused work.
Payment Details: Equity Business Number: 247247, Account: 1170184512866, Mpesa: 0795544180`,
    ownershipIP: `Upon receipt of full payment, ownership of the final deliverables will be transferred to the Client.
The Service Provider retains the right to showcase the completed work in portfolios or promotional materials unless otherwise agreed in writing.`,
    termination: `Either party may terminate this Agreement with written notice.
If termination occurs after work has commenced, the Client agrees to pay for all work completed up to the termination date. Deposits are non-refundable once work has started.`,
    governingLaw: `This Agreement shall be governed by and interpreted in accordance with the laws of the applicable jurisdiction.`,
    currency: 'KES',
    totalAmount: 0,
    notes: '',
});
