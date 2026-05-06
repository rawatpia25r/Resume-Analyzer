const PDFDocument = require('pdfkit');

// @desc    Generate PDF from text
// @route   POST /api/pdf/generate
// @access  Private
const generatePdf = async (req, res) => {
  try {
    const { content, title } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Please provide content to convert.' });
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
    });

    // Collect the PDF into a buffer
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${title || 'document'}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    });

    // Add title
    doc.fontSize(22).font('Helvetica-Bold').text(title || 'Generated Document', {
      underline: true,
    });
    doc.moveDown(1);

    // Add a separator line
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke('#dddddd');
    doc.moveDown(0.5);

    // Add content
    doc.fontSize(12).font('Helvetica').text(content, {
      lineGap: 4,
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

module.exports = { generatePdf };
