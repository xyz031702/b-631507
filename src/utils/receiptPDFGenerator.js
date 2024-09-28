import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPDF = async (receiptData, templateNumber, dimensions = { width: '80mm', height: 'auto' }) => {
  dimensions.width = "210mm";
  dimensions.height = "100mm";
  return new Promise(async (resolve, reject) => {
    try {
      const receipt = document.createElement("div");
      document.body.appendChild(receipt);

      // Render the Template10 component to a string
      const Template10 = (await import("../components/templates/Template10"))
        .default;
      const ReactDOMServer = (await import("react-dom/server")).default;
      const React = (await import("react")).default;

      const receiptElement = React.createElement(Template10, {
        data: receiptData,
        isPrint: true,
      });
      const receiptHTML = ReactDOMServer.renderToString(receiptElement);

      receipt.innerHTML = receiptHTML;
      receipt.style.width = dimensions.width;
      receipt.style.height = dimensions.height;

      const canvas = await html2canvas(receipt, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = parseFloat(dimensions.width);
      const pdfHeight = canvas.height * (pdfWidth / canvas.width);
      console.log("pdfWidth", pdfWidth);
      console.log("pdfHeight", pdfHeight);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );

      const { number, date } = receiptData.invoice;
      const timestamp = new Date().getTime();
      const fileName = `Receipt_${number}_${timestamp}.pdf`;

      pdf.save(fileName);

      document.body.removeChild(receipt);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
