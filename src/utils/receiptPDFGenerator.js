import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPDF = async (receiptElement) => {
  try {
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    const timestamp = new Date().getTime();
    const fileName = `Receipt_${timestamp}.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
