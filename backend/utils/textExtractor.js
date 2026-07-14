const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from a file buffer (PDF or DOCX).
 *
 * @param {Buffer} buffer - The file buffer.
 * @param {string} mimetype - The MIME type of the file.
 * @returns {Promise<string>} The extracted text.
 */
async function extractText(buffer, mimetype) {
  try {
    if (mimetype === 'application/pdf') {
      const data = await pdfParse(buffer);
      return data.text || '';
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      const data = await mammoth.extractRawText({ buffer });
      return data.value || '';
    } else {
      throw new Error(`Unsupported file type for extraction: ${mimetype}`);
    }
  } catch (err) {
    console.error('[TextExtractor] Error extracting text:', err);
    throw new Error('Failed to extract text from the document.');
  }
}

module.exports = { extractText };
