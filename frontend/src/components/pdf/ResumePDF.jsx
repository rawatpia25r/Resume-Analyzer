import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    fontSize: 10,
    color: '#555555',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#6366f1',
    paddingBottom: 4,
    marginTop: 16,
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  duration: {
    fontSize: 10,
    color: '#777777',
    fontStyle: 'italic',
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: '#1a1a2e',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.6,
  },
  bodyText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.6,
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  skillLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a2e',
    width: 70,
  },
  skillText: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
  experienceItem: {
    marginBottom: 12,
  },
  educationItem: {
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTech: {
    fontSize: 9,
    color: '#555555',
    marginTop: 4,
  },
  certItem: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 4,
    flexDirection: 'row',
  },
});

const ResumePDF = ({ data }) => {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{data.name || 'Candidate Name'}</Text>

        {/* Contact Bar */}
        <View style={styles.contactBar}>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {data.phone && <Text style={styles.contactItem}>|  {data.phone}</Text>}
          {data.location && <Text style={styles.contactItem}>|  {data.location}</Text>}
          {data.linkedin && <Text style={styles.contactItem}>|  {data.linkedin}</Text>}
        </View>

        {/* Summary */}
        {data.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((job, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.duration}>{job.duration}</Text>
                </View>
                <Text style={styles.company}>{job.company}</Text>
                {job.bullets?.map((bullet, j) => (
                  <View key={j} style={styles.bulletContainer}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.duration}>{edu.year}</Text>
                </View>
                <Text style={styles.bodyText}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.technical?.length > 0 && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Technical:</Text>
                <Text style={styles.skillText}>{data.skills.technical.join(', ')}</Text>
              </View>
            )}
            {data.skills.soft?.length > 0 && (
              <View style={styles.skillsRow}>
                <Text style={styles.skillLabel}>Soft Skills:</Text>
                <Text style={styles.skillText}>{data.skills.soft.join(', ')}</Text>
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                <Text style={styles.bodyText}>{proj.description}</Text>
                {proj.tech?.length > 0 && (
                  <Text style={styles.projectTech}>Tech Stack: {proj.tech.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <View key={i} style={styles.bulletContainer}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{cert}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
