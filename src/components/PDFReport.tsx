import React from 'react'
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf,
  Font
} from '@react-pdf/renderer'
import type { ComprehensiveAssessmentResult, BaseAssessmentResult } from '@/types/assessment'

// Register Plus Jakarta Sans fonts for brand consistency
Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    {
      src: '/src/fonts/PlusJakartaSans-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/src/fonts/PlusJakartaSans-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '/src/fonts/PlusJakartaSans-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
})

// PDF Styles - Ultra-Modern, Clean, Professional Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 28,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1f2937',
  },
  
  // Modern header with sophisticated branding
  header: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottom: '2 solid #e1e7f0',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    border: '1 solid #e2e8f0',
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'normal',
    marginTop: 8,
  },
  
  brandInfo: {
    textAlign: 'center',
    marginTop: 8,
  },
  
  brandText: {
    fontSize: 11,
    color: '#0369a1',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  
  // Modern card-based sections
  section: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    border: '1 solid #e2e8f0',
    overflow: 'hidden',
    boxShadow: '0 1 3 0 rgba(0, 0, 0, 0.1)',
  },
  
  sectionHeader: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderBottom: '1 solid #e2e8f0',
  },
  
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: -0.2,
  },
  
  sectionContent: {
    padding: 16,
  },
  
  // Clean user info grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  infoItem: {
    flexDirection: 'column',
    minWidth: '45%',
    marginBottom: 12,
  },
  
  infoLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  
  infoValue: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '600',
  },
  
  // Clean assessment result display
  resultCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    border: '2 solid #e2e8f0',
    marginBottom: 12,
  },
  
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1 solid #f1f5f9',
  },
  
  scoreSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  scoreLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  
  maxScore: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 4,
  },
  
  severitySection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  severityLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  
  severityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    border: '1 solid #e2e8f0',
  },
  
  interpretationText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 1.6,
    textAlign: 'left',
    marginTop: 12,
    fontStyle: 'italic',
  },
  
  // Modern table design
  table: {
    marginTop: 4,
    borderRadius: 8,
    overflow: 'hidden',
    border: '1 solid #e2e8f0',
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: '2 solid #e2e8f0',
  },
  
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottom: '0.5 solid #f1f5f9',
    minHeight: 32,
  },
  
  tableRowEven: {
    backgroundColor: '#f8fafc',
  },
  
  tableCell: {
    fontSize: 8,
    color: '#334155',
    lineHeight: 1.3,
    flexWrap: 'wrap',
  },
  
  questionCell: {
    width: '60%',
    paddingRight: 8,
  },
  
  scoreCell: {
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0369a1',
  },
  
  responseCell: {
    width: '20%',
    fontSize: 7,
    color: '#64748b',
    textAlign: 'center',
  },
  
  // Clean AI summary
  aiCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    border: '1 solid #e2e8f0',
    overflow: 'hidden',
  },
  
  aiHeader: {
    backgroundColor: '#f8fafc',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1 solid #e2e8f0',
  },
  
  aiIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  
  aiTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  aiContent: {
    padding: 16,
  },
  
  aiText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
  },
  
  aiDisclaimer: {
    fontSize: 8,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Professional footer
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTop: '1 solid #e2e8f0',
    textAlign: 'center',
  },
  
  footerText: {
    fontSize: 8,
    color: '#64748b',
    lineHeight: 1.4,
    textAlign: 'center',
  },
  
  // High-priority alert
  alertBox: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 8,
    border: '2 solid #f87171',
    marginBottom: 16,
  },
  
  alertText: {
    fontSize: 11,
    color: '#dc2626',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  
  // Risk level styling
  riskLow: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  
  riskMild: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
  },
  
  riskModerate: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  
  riskHigh: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
})

interface PDFReportProps {
  result: ComprehensiveAssessmentResult<BaseAssessmentResult>
}

export const PDFReport: React.FC<PDFReportProps> = ({ result }) => {
  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'low': return styles.riskLow
      case 'mild': return styles.riskMild
      case 'moderate': 
      case 'moderately-severe': return styles.riskModerate
      case 'high': 
      case 'severe': return styles.riskHigh
      default: return {}
    }
  }

  const getMaxScore = (assessmentType: string) => {
    switch (assessmentType) {
      case 'phq9': return 27
      case 'gad7': return 21
      case 'asrs': return 72
      case 'aq10': return 10
      case 'pcl5': return 80
      case 'ocir': return 72
      case 'mdq': return 15
      case 'k10': return 50
      default: return 'N/A'
    }
  }

  const getResponseText = (score: number, assessmentType: string) => {
    if (assessmentType === 'phq9' || assessmentType === 'gad7') {
      switch (score) {
        case 0: return 'Not at all'
        case 1: return 'Several days'
        case 2: return 'More than half'
        case 3: return 'Nearly every day'
        default: return 'N/A'
      }
    }
    return score.toString()
  }

  const isHighRisk = ['high', 'severe', 'moderately-severe'].includes(result.baseResult.risk)
  const maxScore = getMaxScore(result.assessmentType)
  
  // Only show user info if meaningful data exists
  const hasUserInfo = result.userProfile.firstName || result.userProfile.lastName || 
                     result.userProfile.age || result.userProfile.zipCode

  const userInfoFields = hasUserInfo ? [
    ...(result.userProfile.firstName || result.userProfile.lastName ? 
      [{ label: 'Name', value: `${result.userProfile.firstName || ''} ${result.userProfile.lastName || ''}`.trim() }] : []),
    ...(result.userProfile.age ? [{ label: 'Age', value: `${result.userProfile.age} years` }] : []),
    ...(result.userProfile.gender !== 'prefer-not-to-say' ? [{ label: 'Gender', value: result.userProfile.gender }] : []),
    ...(result.userProfile.zipCode ? [{ label: 'Location', value: result.userProfile.zipCode }] : [])
  ] : []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Modern Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mental Health Assessment Report</Text>
          <Text style={styles.headerSubtitle}>
            {result.assessmentType.toUpperCase()} Assessment • {new Date(result.assessmentDate).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </Text>
          <View style={styles.brandInfo}>
            <Text style={styles.brandText}>MINDSCREEN AI • PROFESSIONAL MENTAL HEALTH SCREENING</Text>
          </View>
        </View>

        {/* User Information - Only if meaningful data exists */}
        {userInfoFields.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Patient Information</Text>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.infoGrid}>
                {userInfoFields.map((field, index) => (
                  <View key={index} style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{field.label}</Text>
                    <Text style={styles.infoValue}>{field.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Assessment Results */}
        <View style={[styles.section, getRiskStyle(result.baseResult.risk)]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Assessment Results</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={styles.scoreSection}>
                  <Text style={styles.scoreLabel}>Total Score</Text>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreNumber}>{result.baseResult.score}</Text>
                    <Text style={styles.maxScore}>/ {maxScore}</Text>
                  </View>
                </View>
                
                <View style={styles.severitySection}>
                  <Text style={styles.severityLabel}>Severity Level</Text>
                  <Text style={styles.severityValue}>{result.baseResult.severity}</Text>
                </View>
              </View>

              {/* High Risk Alert */}
              {isHighRisk && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>
                    ⚠️ HIGH PRIORITY ALERT{'\n'}
                    These results indicate significant symptoms requiring immediate professional attention.{'\n'}
                    Crisis Support: 988 Suicide & Crisis Lifeline (24/7 • Free • Confidential)
                  </Text>
                </View>
              )}

              <Text style={styles.interpretationText}>
                {result.baseResult.interpretation}
              </Text>
            </View>
          </View>
        </View>

        {/* AI Clinical Summary - Move to next page */}
        {result.aiInsights && (
          <View style={styles.section} break>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>AI Clinical Summary</Text>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.aiCard}>
                <View style={styles.aiHeader}>
                  <Text style={styles.aiIcon}>🤖</Text>
                  <Text style={styles.aiTitle}>AI-Generated Clinical Insights</Text>
                </View>
                <View style={styles.aiContent}>
                  <Text style={styles.aiText}>
                    {result.aiInsights.personalizedSummary}
                  </Text>
                  <Text style={styles.aiDisclaimer}>
                    AI content is supplementary and should be reviewed with healthcare professionals.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* User Responses Table - Don't split unnecessarily */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Response Details</Text>
          </View>
          <View style={styles.sectionContent}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.questionCell]}>Question</Text>
                <Text style={[styles.tableHeaderText, styles.scoreCell]}>Score</Text>
                <Text style={[styles.tableHeaderText, styles.responseCell]}>Response</Text>
              </View>
              
              {/* All table rows - let PDF renderer handle page breaks naturally */}
              {result.detailedScoreBreakdown.map((item, index) => (
                <View key={index} style={[styles.tableRow, ...(index % 2 === 1 ? [styles.tableRowEven] : [])]}>
                  <Text style={[styles.tableCell, styles.questionCell]}>
                    {item.question}
                  </Text>
                  <Text style={[styles.tableCell, styles.scoreCell]}>
                    {item.score}
                  </Text>
                  <Text style={[styles.tableCell, styles.responseCell]}>
                    {getResponseText(item.score, result.assessmentType)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Professional Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This report was generated by MindScreen AI on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}{'\n'}
            This assessment is a screening tool and not a medical diagnosis • Please share with your healthcare provider for professional evaluation{'\n'}
            For immediate crisis support: Call 988 (Suicide & Crisis Lifeline) • Text "HELLO" to 741741 (Crisis Text Line)
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// PDF Generation Service
export class PDFService {
  static async generateAndDownload(result: ComprehensiveAssessmentResult<BaseAssessmentResult>): Promise<void> {
    try {
      // Generate PDF document
      const doc = <PDFReport result={result} />
      const pdfBlob = await pdf(doc).toBlob()
      
      // Create download filename
      const fileName = `MindScreen-${result.assessmentType}-Report-${result.userProfile.firstName}-${result.userProfile.lastName}-${new Date(result.assessmentDate).toISOString().split('T')[0]}.pdf`
      
      // Download the PDF
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      console.log('PDF generated and downloaded successfully:', fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Failed to generate PDF report')
    }
  }

  static async generatePDFBlob(result: ComprehensiveAssessmentResult<BaseAssessmentResult>): Promise<Blob> {
    try {
      const doc = <PDFReport result={result} />
      return await pdf(doc).toBlob()
    } catch (error) {
      console.error('Error generating PDF blob:', error)
      throw new Error('Failed to generate PDF')
    }
  }
}
