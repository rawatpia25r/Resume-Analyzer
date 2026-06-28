import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
  },
  date: {
    fontSize: 10,
    color: '#555',
    marginBottom: 20,
  },
  addressBlock: {
    fontSize: 10,
    color: '#333',
    marginBottom: 4,
    lineHeight: 1.5,
  },
  salutation: {
    fontSize: 11,
    color: '#1a1a2e',
    marginTop: 20,
    marginBottom: 14,
  },
  bodyParagraph: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.7,
    marginBottom: 12,
    textAlign: 'justify',
  },
  closing: {
    fontSize: 11,
    color: '#1a1a2e',
    marginTop: 20,
    marginBottom: 6,
  },
  signature: {
    fontSize: 11,
    color: '#1a1a2e',
    fontWeight: 'bold',
  },
});

const CoverLetterPDF = ({ text, name, role, company }) => {
  if (!text) return null;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Split cover letter text into paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.date}>{today}</Text>
          {company && <Text style={styles.addressBlock}>{company}</Text>}
          {role && <Text style={styles.addressBlock}>RE: {role}</Text>}
        </View>

        <Text style={styles.salutation}>Dear Hiring Manager,</Text>

        {paragraphs.map((paragraph, i) => {
          // Skip if paragraph is just the salutation or closing
          const lower = paragraph.toLowerCase().trim();
          if (lower.startsWith('dear ') || lower.startsWith('sincerely') || lower.startsWith('best regards') || lower.startsWith('yours')) {
            return null;
          }
          return (
            <Text key={i} style={styles.bodyParagraph}>
              {paragraph.trim()}
            </Text>
          );
        })}

        <Text style={styles.closing}>Sincerely,</Text>
        <Text style={styles.signature}>{name || '[Your Name]'}</Text>
      </Page>
    </Document>
  );
};

export default CoverLetterPDF;
