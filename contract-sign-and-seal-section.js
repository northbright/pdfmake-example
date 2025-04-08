import fs from 'fs';
import PdfPrinter from 'pdfmake';

let docDefination = {
  'content': [
    { text: "Contract", fontSize: 18, bold: true, alignment: "center" },
    {
      layout: 'noBorders',
      table: {
        widths: ['*','*'],
        body: [
          [
            { text: 'Party A(seal):', alignment: "center" }, 
            { text: 'Party B(seal):', alignment: "center" },
          ],
        ],
      },
      marginTop: 400,
    },
    {
      layout: 'noBorders',
      table: {
        widths: ['*','*'],
        body: [
          [
            { text: 'Party A(sign):', alignment: "center" }, 
            { text: 'party B(sign):', alignment: "center" },
          ],
        ],
      },
      marginTop: 200,
    },    
  ],
  defaultStyle: {
    fontSize: 12,
  }
}

var fonts = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

let printer = new PdfPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(docDefination, {});
pdfDoc.pipe(fs.createWriteStream('pdfs/contract-sign-and-seal-section.pdf'));
pdfDoc.end();
