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
    termsAndConditions: '',
    paymentTerms: '',
    currency: 'KES',
    totalAmount: 0,
    notes: '',
});
