import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';

export const generateAndDownloadCoverLetterDocx = async (coverLetterText, companyName, roleName, filename) => {
  const defaultFilename = `Cover_Letter_${companyName || 'Tailored'}.docx`;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 22, // 11pt
            color: '1A1A2E',
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch = 1440 twips
          },
        },
        children: coverLetterText.split('\n').map(line => {
          if (!line.trim()) {
            return new Paragraph({ text: '', spacing: { after: 200 } });
          }
          return new Paragraph({
            children: [new TextRun({ text: line })],
            spacing: { after: 200, line: 360 }, // 1.5 line spacing
            alignment: AlignmentType.JUSTIFIED,
          });
        }),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename || defaultFilename);
};
