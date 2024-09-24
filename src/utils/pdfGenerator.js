import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (invoiceData) => {
  const invoice = document.createElement('div');
  document.body.appendChild(invoice);
  
  // Render the InvoiceTemplate component to a string
  const InvoiceTemplate = (await import('../components/InvoiceTemplate')).default;
  const ReactDOMServer = (await import('react-dom/server')).default;
  const React = (await import('react')).default;
  
  const invoiceElement = React.createElement(InvoiceTemplate, { data: invoiceData });
  const invoiceHTML = ReactDOMServer.renderToString(invoiceElement);
  
  invoice.innerHTML = invoiceHTML;
  invoice.style.width = '210mm';
  invoice.style.height = '297mm';
  
  const canvas = await html2canvas(invoice, {
    scale: 2,
    useCORS: true,
    logging: false,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  pdf.save('invoice.pdf');
  
  document.body.removeChild(invoice);
};
