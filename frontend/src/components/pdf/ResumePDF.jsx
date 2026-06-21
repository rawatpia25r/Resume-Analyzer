import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  contactBar: {
    flexDirection: 'row',
    gap: 12,
    fontSize: 9,
    color: '#555',
    marginBottom: 16,
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
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#6366f1',
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  company: {
    fontSize: 10,
    color: '#555',
  },
  duration: {
    fontSize: 9,
    color: '#888',
  },
  bullet: {
    fontSize: 9,
    color: '#333',
    marginLeft: 10,
    marginBottom: 2,
  },
  bodyText: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
  skillBadge: {
    fontSize: 9,
    backgroundColor: '#ede9fe',
    color: '#6366f1',
    padding: '3 7',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 3,
    marginTop: 4,
  },
  experienceItem: {
    marginBottom: 8,
  },
  educationItem: {
    marginBottom: 6,
  },
  projectItem: {
    marginBottom: 6,
  },
  projectTech: {
    fontSize: 8,
    color: '#6366f1',
    marginTop: 2,
  },
  certItem: {
    fontSize: 10,
    color: '#333',
    marginBottom: 2,
    marginLeft: 10,
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
          {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
          {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          {data.linkedin && <Text style={styles.contactItem}>{data.linkedin}</Text>}
        </View>

        {/* Summary */}
        {data.summary && (
          <>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((job, i) => (
              <View key={i} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.duration}>{job.duration}</Text>
                {job.bullets?.map((bullet, j) => (
                  <Text key={j} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>{edu.school} — {edu.year}</Text>
              </View>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.technical?.length > 0 && (
              <>
                <Text style={styles.skillLabel}>Technical</Text>
                <View style={styles.skillsRow}>
                  {data.skills.technical.map((skill, i) => (
                    <Text key={i} style={styles.skillBadge}>{skill}</Text>
                  ))}
                </View>
              </>
            )}
            {data.skills.soft?.length > 0 && (
              <>
                <Text style={styles.skillLabel}>Soft Skills</Text>
                <View style={styles.skillsRow}>
                  {data.skills.soft.map((skill, i) => (
                    <Text key={i} style={styles.skillBadge}>{skill}</Text>
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={styles.certItem}>• {cert}</Text>
            ))}
          </>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.jobTitle}>{proj.name}</Text>
                <Text style={styles.bodyText}>{proj.description}</Text>
                {proj.tech?.length > 0 && (
                  <Text style={styles.projectTech}>Tech: {proj.tech.join(', ')}</Text>
                )}
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
