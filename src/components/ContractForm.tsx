import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ContractData } from '@/types/contract';

interface ContractFormProps {
    contract: ContractData;
    onChange: (contract: ContractData) => void;
}

const currencies = [
    { value: 'KES', label: 'KES - Kenyan Shilling' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
];

export const ContractForm: React.FC<ContractFormProps> = ({ contract, onChange }) => {
    const updateClient = (field: keyof typeof contract.client, value: string) => {
        onChange({
            ...contract,
            client: { ...contract.client, [field]: value },
        });
    };

    return (
        <div className="space-y-6">
            {/* Contract Details */}
            <Card className="shadow-card animate-fade-in">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contractNumber" className="text-sm font-medium">Contract Number</Label>
                            <Input
                                id="contractNumber"
                                value={contract.contractNumber}
                                onChange={(e) => onChange({ ...contract, contractNumber: e.target.value })}
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Currency</Label>
                            <Select
                                value={contract.currency}
                                onValueChange={(value) => onChange({ ...contract, currency: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Issue Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !contract.issueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {contract.issueDate ? format(contract.issueDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={contract.issueDate}
                                        onSelect={(date) => date && onChange({ ...contract, issueDate: date })}
                                        className="pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Effective Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !contract.effectiveDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {contract.effectiveDate ? format(contract.effectiveDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={contract.effectiveDate}
                                        onSelect={(date) => date && onChange({ ...contract, effectiveDate: date })}
                                        className="pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client Details */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '50ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientName" className="text-sm font-medium">Client Name</Label>
                            <Input
                                id="clientName"
                                placeholder="John Doe"
                                value={contract.client.name}
                                onChange={(e) => updateClient('name', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientCompany" className="text-sm font-medium">Company</Label>
                            <Input
                                id="clientCompany"
                                placeholder="Acme Inc."
                                value={contract.client.company}
                                onChange={(e) => updateClient('company', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientEmail" className="text-sm font-medium">Email</Label>
                            <Input
                                id="clientEmail"
                                type="email"
                                placeholder="john@example.com"
                                value={contract.client.email}
                                onChange={(e) => updateClient('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientPhone" className="text-sm font-medium">Phone</Label>
                            <Input
                                id="clientPhone"
                                placeholder="+254 700 000 000"
                                value={contract.client.phone}
                                onChange={(e) => updateClient('phone', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientAddress" className="text-sm font-medium">Address</Label>
                        <Textarea
                            id="clientAddress"
                            placeholder="123 Main Street, Nairobi, Kenya"
                            value={contract.client.address}
                            onChange={(e) => updateClient('address', e.target.value)}
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Service Agreement */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Service Agreement</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Detailed description of services to be provided..."
                        value={contract.serviceAgreement}
                        onChange={(e) => onChange({ ...contract, serviceAgreement: e.target.value })}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Legal terms, liabilities, termination clauses..."
                        value={contract.termsAndConditions}
                        onChange={(e) => onChange({ ...contract, termsAndConditions: e.target.value })}
                        rows={6}
                    />
                </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="totalAmount" className="text-sm font-medium">Total Contract Amount</Label>
                            <Input
                                id="totalAmount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={contract.totalAmount}
                                onChange={(e) => onChange({ ...contract, totalAmount: parseFloat(e.target.value) || 0 })}
                                className="text-right"
                            />
                        </div>
                    </div>
                    <Textarea
                        placeholder="Payment schedule, late fees, etc..."
                        value={contract.paymentTerms}
                        onChange={(e) => onChange({ ...contract, paymentTerms: e.target.value })}
                        rows={3}
                    />
                </CardContent>
            </Card>

            {/* Ownership & Intellectual Property */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Ownership & Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Ownership terms..."
                        value={contract.ownershipIP}
                        onChange={(e) => onChange({ ...contract, ownershipIP: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Termination */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '250ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Termination</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Termination terms..."
                        value={contract.termination}
                        onChange={(e) => onChange({ ...contract, termination: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Governing law terms..."
                        value={contract.governingLaw}
                        onChange={(e) => onChange({ ...contract, governingLaw: e.target.value })}
                        rows={2}
                    />
                </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '350ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Any other relevant information..."
                        value={contract.notes}
                        onChange={(e) => onChange({ ...contract, notes: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
