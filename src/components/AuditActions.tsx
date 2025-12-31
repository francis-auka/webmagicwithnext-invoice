import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Loader2 } from 'lucide-react';
import { AuditData } from '@/types/audit';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface AuditActionsProps {
    audit: AuditData;
}

export const AuditActions: React.FC<AuditActionsProps> = ({ audit }) => {
    const { toast } = useToast();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        const element = document.getElementById('audit-preview');
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
            pdf.save(`Audit-${audit.auditNumber}.pdf`);

            toast({
                title: 'Audit Report Downloaded',
                description: `Audit-${audit.auditNumber}.pdf has been saved.`,
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
        const subject = encodeURIComponent(`Audit Report ${audit.auditNumber} for ${audit.client.name || 'Client'}`);
        const body = encodeURIComponent(
            `Dear ${audit.client.name || 'Client'},\n\nPlease find attached the audit report ${audit.auditNumber}.\n\nBest regards,\nwebmagicwithnext`
        );
        const email = audit.client.email || '';

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
                disabled={!audit.client.email}
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
