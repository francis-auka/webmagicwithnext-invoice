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
import { InvoiceData, LineItem } from '@/types/invoice';

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (invoice: InvoiceData) => void;
}

const currencies = [
  { value: 'KES', label: 'KES - Kenyan Shilling' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
];

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onChange }) => {
  const updateClient = (field: keyof typeof invoice.client, value: string) => {
    onChange({
      ...invoice,
      client: { ...invoice.client, [field]: value },
    });
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    onChange({
      ...invoice,
      lineItems: invoice.lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addLineItem = () => {
    onChange({
      ...invoice,
      lineItems: [
        ...invoice.lineItems,
        { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 },
      ],
    });
  };

  const removeLineItem = (id: string) => {
    if (invoice.lineItems.length > 1) {
      onChange({
        ...invoice,
        lineItems: invoice.lineItems.filter((item) => item.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Invoice Details */}
      <Card className="shadow-card animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-sm font-medium">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => onChange({ ...invoice, invoiceNumber: e.target.value })}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Currency</Label>
              <Select
                value={invoice.currency}
                onValueChange={(value) => onChange({ ...invoice, currency: value })}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Issue Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoice.issueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoice.issueDate ? format(invoice.issueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={invoice.issueDate}
                    onSelect={(date) => date && onChange({ ...invoice, issueDate: date })}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoice.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoice.dueDate ? format(invoice.dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={invoice.dueDate}
                    onSelect={(date) => date && onChange({ ...invoice, dueDate: date })}
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
          <CardTitle className="text-lg font-semibold text-foreground">Bill To</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-sm font-medium">Client Name</Label>
              <Input
                id="clientName"
                placeholder="John Doe"
                value={invoice.client.name}
                onChange={(e) => updateClient('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientCompany" className="text-sm font-medium">Company</Label>
              <Input
                id="clientCompany"
                placeholder="Acme Inc."
                value={invoice.client.company}
                onChange={(e) => updateClient('company', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientEmail" className="text-sm font-medium">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="john@example.com"
                value={invoice.client.email}
                onChange={(e) => updateClient('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone" className="text-sm font-medium">Phone</Label>
              <Input
                id="clientPhone"
                placeholder="+254 700 000 000"
                value={invoice.client.phone}
                onChange={(e) => updateClient('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress" className="text-sm font-medium">Address</Label>
            <Textarea
              id="clientAddress"
              placeholder="123 Main Street, Nairobi, Kenya"
              value={invoice.client.address}
              onChange={(e) => updateClient('address', e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Desktop header */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 px-1">
            <div className="col-span-7">Description</div>
            <div className="col-span-3 text-right">Rate</div>
            <div className="col-span-2"></div>
          </div>

          {invoice.lineItems.map((item) => (
            <div key={item.id} className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 gap-4 items-center p-3 sm:p-0 bg-muted/30 sm:bg-transparent rounded-lg sm:rounded-none">
              {/* Mobile label */}
              <Label className="sm:hidden text-xs text-muted-foreground">Description</Label>
              <div className="sm:col-span-7">
                <Input
                  placeholder="Web Development"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                />
              </div>
              {/* Mobile label */}
              <Label className="sm:hidden text-xs text-muted-foreground mt-2">Rate</Label>
              <div className="sm:col-span-3">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="text-right"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end mt-2 sm:mt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(item.id)}
                  disabled={invoice.lineItems.length === 1}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addLineItem} className="w-full mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      {/* Tax & Discount */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '150ms' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Adjustments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate" className="text-sm font-medium">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={invoice.taxRate}
                onChange={(e) => onChange({ ...invoice, taxRate: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-sm font-medium">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={invoice.discountPercent}
                onChange={(e) => onChange({ ...invoice, discountPercent: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">Notes & Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Payment terms, bank details, or any additional notes..."
            value={invoice.notes}
            onChange={(e) => onChange({ ...invoice, notes: e.target.value })}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};
