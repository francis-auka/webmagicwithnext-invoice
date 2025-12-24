import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Loader2 } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceActionsProps {
  invoice: InvoiceData;
}

export const InvoiceActions: React.FC<InvoiceActionsProps> = ({ invoice }) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800, // Ensure consistent width for rendering
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate dimensions in mm
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with dynamic height
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [imgWidth, imgHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${invoice.invoiceNumber}.pdf`);

      toast({
        title: 'Invoice Downloaded',
        description: `${invoice.invoiceNumber}.pdf has been saved.`,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'There was an error generating the PDF.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from webmagicwithnext`);
    const body = encodeURIComponent(
      `Dear ${invoice.client.name || 'Client'},\n\nPlease find attached the invoice ${invoice.invoiceNumber}.\n\nBest regards,\nwebmagicwithnext`
    );
    const email = invoice.client.email || '';

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');

    toast({
      title: 'Email Client Opened',
      description: 'Compose your email and attach the downloaded PDF.',
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSendEmail}
        disabled={!invoice.client.email}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button
        variant="accent"
        size="sm"
        onClick={handleDownloadPDF}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Download PDF
      </Button>
    </div>
  );
};
