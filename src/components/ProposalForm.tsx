import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ProposalData, ProposalScopeItem, ProposalCostItem } from '@/types/proposal';

interface ProposalFormProps {
    proposal: ProposalData;
    onChange: (proposal: ProposalData) => void;
}

const currencies = [
    { value: 'KES', label: 'KES - Kenyan Shilling' },
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
];

export const ProposalForm: React.FC<ProposalFormProps> = ({ proposal, onChange }) => {
    const updateClient = (field: keyof typeof proposal.client, value: string) => {
        onChange({
            ...proposal,
            client: { ...proposal.client, [field]: value },
        });
    };

    const updateScopeItem = (id: string, field: keyof ProposalScopeItem, value: string) => {
        onChange({
            ...proposal,
            scopeItems: proposal.scopeItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        });
    };

    const addScopeItem = () => {
        onChange({
            ...proposal,
            scopeItems: [
                ...proposal.scopeItems,
                { id: crypto.randomUUID(), description: '', deliverable: '' },
            ],
        });
    };

    const removeScopeItem = (id: string) => {
        if (proposal.scopeItems.length > 1) {
            onChange({
                ...proposal,
                scopeItems: proposal.scopeItems.filter((item) => item.id !== id),
            });
        }
    };

    const updateCostItem = (id: string, field: keyof ProposalCostItem, value: string | number) => {
        onChange({
            ...proposal,
            costItems: proposal.costItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        });
    };

    const addCostItem = () => {
        onChange({
            ...proposal,
            costItems: [
                ...proposal.costItems,
                { id: crypto.randomUUID(), description: '', amount: 0 },
            ],
        });
    };

    const removeCostItem = (id: string) => {
        if (proposal.costItems.length > 1) {
            onChange({
                ...proposal,
                costItems: proposal.costItems.filter((item) => item.id !== id),
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Proposal Details */}
            <Card className="shadow-card animate-fade-in">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Proposal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="proposalNumber" className="text-sm font-medium">Proposal Number</Label>
                            <Input
                                id="proposalNumber"
                                value={proposal.proposalNumber}
                                onChange={(e) => onChange({ ...proposal, proposalNumber: e.target.value })}
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Currency</Label>
                            <Select
                                value={proposal.currency}
                                onValueChange={(value) => onChange({ ...proposal, currency: value })}
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
                                            !proposal.issueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {proposal.issueDate ? format(proposal.issueDate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={proposal.issueDate}
                                        onSelect={(date) => date && onChange({ ...proposal, issueDate: date })}
                                        className="pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Valid Until</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !proposal.validUntil && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {proposal.validUntil ? format(proposal.validUntil, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={proposal.validUntil}
                                        onSelect={(date) => date && onChange({ ...proposal, validUntil: date })}
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
                                value={proposal.client.name}
                                onChange={(e) => updateClient('name', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientCompany" className="text-sm font-medium">Company</Label>
                            <Input
                                id="clientCompany"
                                placeholder="Acme Inc."
                                value={proposal.client.company}
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
                                value={proposal.client.email}
                                onChange={(e) => updateClient('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientPhone" className="text-sm font-medium">Phone</Label>
                            <Input
                                id="clientPhone"
                                placeholder="+254 700 000 000"
                                value={proposal.client.phone}
                                onChange={(e) => updateClient('phone', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientAddress" className="text-sm font-medium">Address</Label>
                        <Textarea
                            id="clientAddress"
                            placeholder="123 Main Street, Nairobi, Kenya"
                            value={proposal.client.address}
                            onChange={(e) => updateClient('address', e.target.value)}
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Scope of Work */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Scope of Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
                        <div className="col-span-6">Description</div>
                        <div className="col-span-4">Deliverable</div>
                        <div className="col-span-2"></div>
                    </div>

                    {proposal.scopeItems.map((item) => (
                        <div key={item.id} className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 gap-4 items-start p-3 sm:p-0 bg-muted/30 sm:bg-transparent rounded-lg sm:rounded-none">
                            <div className="sm:col-span-6 space-y-2">
                                <Label className="sm:hidden text-xs text-muted-foreground">Description</Label>
                                <Textarea
                                    placeholder="Task description..."
                                    value={item.description}
                                    onChange={(e) => updateScopeItem(item.id, 'description', e.target.value)}
                                    rows={2}
                                />
                            </div>
                            <div className="sm:col-span-4 space-y-2">
                                <Label className="sm:hidden text-xs text-muted-foreground">Deliverable</Label>
                                <Input
                                    placeholder="e.g. UI Mockups"
                                    value={item.deliverable}
                                    onChange={(e) => updateScopeItem(item.id, 'deliverable', e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeScopeItem(item.id)}
                                    disabled={proposal.scopeItems.length === 1}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" onClick={addScopeItem} className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Scope Item
                    </Button>
                </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Project phases, milestones, and estimated completion dates..."
                        value={proposal.timeline}
                        onChange={(e) => onChange({ ...proposal, timeline: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>

            {/* Cost Summary */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Cost Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
                        <div className="col-span-7">Description</div>
                        <div className="col-span-3 text-right">Amount</div>
                        <div className="col-span-2"></div>
                    </div>

                    {proposal.costItems.map((item) => (
                        <div key={item.id} className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 gap-4 items-center p-3 sm:p-0 bg-muted/30 sm:bg-transparent rounded-lg sm:rounded-none">
                            <div className="sm:col-span-7 space-y-2">
                                <Label className="sm:hidden text-xs text-muted-foreground">Description</Label>
                                <Input
                                    placeholder="Service or Phase"
                                    value={item.description}
                                    onChange={(e) => updateCostItem(item.id, 'description', e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-3 space-y-2">
                                <Label className="sm:hidden text-xs text-muted-foreground">Amount</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.amount}
                                    onChange={(e) => updateCostItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                                    className="text-right"
                                />
                            </div>
                            <div className="sm:col-span-2 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCostItem(item.id)}
                                    disabled={proposal.costItems.length === 1}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" onClick={addCostItem} className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Cost Item
                    </Button>
                </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '250ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Assumptions, dependencies, or any other relevant information..."
                        value={proposal.notes}
                        onChange={(e) => onChange({ ...proposal, notes: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
