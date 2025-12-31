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
import { AuditData, AuditIssue } from '@/types/audit';

interface AuditFormProps {
    audit: AuditData;
    onChange: (audit: AuditData) => void;
}

const categories = [
    'SEO',
    'Performance',
    'Security',
    'UI/UX',
    'Accessibility',
    'Content',
];

const severities = [
    'High',
    'Medium',
    'Low',
];

export const AuditForm: React.FC<AuditFormProps> = ({ audit, onChange }) => {
    const updateClient = (field: keyof typeof audit.client, value: string) => {
        onChange({
            ...audit,
            client: { ...audit.client, [field]: value },
        });
    };

    const updateIssue = (id: string, field: keyof AuditIssue, value: string) => {
        onChange({
            ...audit,
            issues: audit.issues.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            ),
        });
    };

    const addIssue = () => {
        onChange({
            ...audit,
            issues: [
                ...audit.issues,
                {
                    id: crypto.randomUUID(),
                    category: 'SEO',
                    severity: 'Medium',
                    description: '',
                    recommendation: '',
                },
            ],
        });
    };

    const removeIssue = (id: string) => {
        if (audit.issues.length > 0) {
            onChange({
                ...audit,
                issues: audit.issues.filter((item) => item.id !== id),
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Audit Details */}
            <Card className="shadow-card animate-fade-in">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Audit Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="auditNumber" className="text-sm font-medium">Audit Number</Label>
                            <Input
                                id="auditNumber"
                                value={audit.auditNumber}
                                onChange={(e) => onChange({ ...audit, auditNumber: e.target.value })}
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !audit.date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {audit.date ? format(audit.date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={audit.date}
                                        onSelect={(date) => date && onChange({ ...audit, date: date })}
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
                    <CardTitle className="text-lg font-semibold text-foreground">Client Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientName" className="text-sm font-medium">Client Name</Label>
                            <Input
                                id="clientName"
                                placeholder="John Doe"
                                value={audit.client.name}
                                onChange={(e) => updateClient('name', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientCompany" className="text-sm font-medium">Company</Label>
                            <Input
                                id="clientCompany"
                                placeholder="Acme Inc."
                                value={audit.client.company}
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
                                value={audit.client.email}
                                onChange={(e) => updateClient('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientWebsite" className="text-sm font-medium">Website URL</Label>
                            <Input
                                id="clientWebsite"
                                placeholder="https://example.com"
                                value={audit.client.website}
                                onChange={(e) => updateClient('website', e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Issues */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Audit Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {audit.issues.map((issue, index) => (
                        <div key={issue.id} className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-semibold text-muted-foreground">Issue #{index + 1}</h4>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeIssue(issue.id)}
                                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                                    <Select
                                        value={issue.category}
                                        onValueChange={(value) => updateIssue(issue.id, 'category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-muted-foreground">Severity</Label>
                                    <Select
                                        value={issue.severity}
                                        onValueChange={(value) => updateIssue(issue.id, 'severity', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {severities.map((s) => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                                <Textarea
                                    placeholder="Describe the issue..."
                                    value={issue.description}
                                    onChange={(e) => updateIssue(issue.id, 'description', e.target.value)}
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground">Recommendation</Label>
                                <Textarea
                                    placeholder="How to fix it..."
                                    value={issue.recommendation}
                                    onChange={(e) => updateIssue(issue.id, 'recommendation', e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" onClick={addIssue} className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Issue
                    </Button>
                </CardContent>
            </Card>

            {/* Notes */}
            <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">Overall Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Executive summary or additional comments..."
                        value={audit.notes}
                        onChange={(e) => onChange({ ...audit, notes: e.target.value })}
                        rows={4}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
