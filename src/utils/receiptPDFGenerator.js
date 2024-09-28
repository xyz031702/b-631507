import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const compressImage = (canvas, quality = 0.7) => {
  return canvas.toDataURL('image/jpeg', quality);
};

export const generateReceiptPDF = async (receiptElement) => {
  try {
    const canvas = await html2canvas(receiptElement, {
      scale: 1.5,
      useCORS: true,
      logging: false,
    });

    const compressedImgData = compressImage(canvas, 0.7);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    let pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Check if the content height exceeds the page height and adjust accordingly
    if (pdfHeight > pdf.internal.pageSize.getHeight()) {
      pdfHeight = pdf.internal.pageSize.getHeight();
    }

    pdf.addImage(compressedImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    const timestamp = new Date().getTime();
    const fileName = `Receipt_${timestamp}.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
