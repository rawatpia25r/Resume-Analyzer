import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';

// Helper to create a section heading
const createSectionHeading = (title) => {
  return new Paragraph({
    text: title.toUpperCase(),
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: 400, after: 120 },
    border: {
      bottom: {
        color: '6366F1', // Indigo/Lavender accent
        space: 1,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
  });
};

// Helper for professional bullets
const createBullet = (text) => {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Arial', size: 20 })],
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
  });
};

export const generateAndDownloadDocx = async (data, filename = 'Professional_Resume.docx') => {
  const sections = [];

  // Header (Name & Contact)
  sections.push(
    new Paragraph({
      text: data.name || 'Candidate Name',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    })
  );

  const contactText = [data.email, data.phone, data.location, data.linkedin]
    .filter(Boolean)
    .join('  |  ');
    
  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: contactText, font: 'Arial', size: 20, color: '555555' })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Summary
  if (data.summary) {
    sections.push(createSectionHeading('Professional Summary'));
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: data.summary, font: 'Arial', size: 22 })],
        spacing: { after: 120, line: 300 },
      })
    );
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    sections.push(createSectionHeading('Professional Experience'));
    data.experience.forEach(job => {
      // Title and Dates
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: job.title, bold: true, font: 'Arial', size: 24 }),
          ],
          spacing: { before: 200, after: 40 },
        })
      );
      // Company and Duration
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: job.company, bold: true, font: 'Arial', size: 22, color: '333333' }),
            new TextRun({ text: `    ${job.duration}`, font: 'Arial', size: 20, color: '777777', italics: true }),
          ],
          spacing: { after: 120 },
        })
      );
      // Bullets
      if (job.bullets) {
        job.bullets.forEach(bullet => {
          sections.push(createBullet(bullet));
        });
      }
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    sections.push(createSectionHeading('Education'));
    data.education.forEach(edu => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true, font: 'Arial', size: 22 }),
          ],
          spacing: { before: 160, after: 40 },
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school, font: 'Arial', size: 22 }),
            new TextRun({ text: `    ${edu.year}`, font: 'Arial', size: 20, color: '777777', italics: true }),
          ],
          spacing: { after: 120 },
        })
      );
    });
  }

  // Skills
  if (data.skills) {
    sections.push(createSectionHeading('Skills'));
    
    if (data.skills.technical && data.skills.technical.length > 0) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Technical: ', bold: true, font: 'Arial', size: 22 }),
            new TextRun({ text: data.skills.technical.join(', '), font: 'Arial', size: 22 }),
          ],
          spacing: { before: 120, after: 80 },
        })
      );
    }
    
    if (data.skills.soft && data.skills.soft.length > 0) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Soft Skills: ', bold: true, font: 'Arial', size: 22 }),
            new TextRun({ text: data.skills.soft.join(', '), font: 'Arial', size: 22 }),
          ],
          spacing: { after: 120 },
        })
      );
    }
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    sections.push(createSectionHeading('Projects'));
    data.projects.forEach(proj => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name, bold: true, font: 'Arial', size: 22 }),
          ],
          spacing: { before: 160, after: 40 },
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.description, font: 'Arial', size: 22 }),
          ],
          spacing: { after: 60, line: 300 },
        })
      );
      if (proj.tech && proj.tech.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Tech Stack: ', bold: true, font: 'Arial', size: 20 }),
              new TextRun({ text: proj.tech.join(', '), font: 'Arial', size: 20, color: '555555' }),
            ],
            spacing: { after: 120 },
          })
        );
      }
    });
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    sections.push(createSectionHeading('Certifications'));
    data.certifications.forEach(cert => {
      sections.push(createBullet(cert));
    });
  }

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 48, bold: true, font: 'Arial', color: '1A1A2E' },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial', color: '6366F1' },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }, // 1 inch margins (in twips)
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
};
