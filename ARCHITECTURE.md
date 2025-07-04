# MindScreen AI - Reusable Assessment System Architecture

## Overview

MindScreen AI has been built with a **modular, reusable architecture** that allows for easy integration of multiple mental health screening tools. The system provides comprehensive, professional-grade results and reports that can be used across all assessment types.

## System Architecture

### 1. Core Types (`src/types/assessment.ts`)
The foundation of our reusable system includes:

- **`UserProfile`**: Collects user information for personalized reports
- **`BaseAssessmentResult`**: Base interface for all assessment results
- **`ComprehensiveAssessmentResult<T>`**: Generic comprehensive results container
- **`DetailedScoreBreakdown`**: Question-by-question analysis
- **`RiskAssessment`**: Risk analysis and protective factors
- **`ActionableTip`**: Personalized, actionable recommendations
- **`AIInsights`**: AI-powered analysis and insights
- **`ProfessionalResources`**: Local providers and support resources
- **`EducationalContent`**: Videos, articles, and learning materials

### 2. Abstract Processor (`src/services/BaseAssessmentProcessor.ts`)
The `BaseAssessmentProcessor<T>` abstract class provides the framework for all screeners:

```typescript
abstract class BaseAssessmentProcessor<T extends BaseAssessmentResult> {
  // Core methods that each screener implements:
  abstract calculateBaseResult(responses: AssessmentResponse[]): T
  abstract categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[]
  abstract assessRisk(baseResult: T, responses: AssessmentResponse[]): RiskAssessment
  abstract identifyStrengths(responses: AssessmentResponse[], baseResult: T): string[]
  abstract generateActionableTips(baseResult: T, responses: AssessmentResponse[], userProfile: UserProfile): ActionableTip[]
  
  // Main processing method (implemented in base class):
  async processAssessment(responses: AssessmentResponse[], userProfile: UserProfile): Promise<ComprehensiveAssessmentResult<T>>
}
```

### 3. Screener-Specific Processors
Each mental health screener has its own processor that extends the base class:

#### Example: PHQ-9 Processor (`src/services/PHQ9Processor.ts`)
```typescript
export class PHQ9Processor extends BaseAssessmentProcessor<PHQ9Result> {
  protected assessmentType = 'PHQ-9' as const
  
  calculateBaseResult(responses: AssessmentResponse[]): PHQ9Result {
    // PHQ-9 specific scoring logic
  }
  
  categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[] {
    // Maps questions to depression symptom categories
  }
  
  assessRisk(baseResult: PHQ9Result, responses: AssessmentResponse[]): RiskAssessment {
    // Depression-specific risk assessment
  }
  
  // ... other PHQ-9 specific implementations
}
```

### 4. Reusable UI Components

#### User Profile Form (`src/components/UserProfileForm.tsx`)
- Collects user information for personalized reports
- Reusable across all screeners
- Includes validation and accessibility features

#### Comprehensive Results (`src/components/ComprehensiveResults.tsx`)
- **Tabbed interface** with multiple sections:
  - **Summary**: Overview with key metrics and risk level
  - **Detailed Results**: Question-by-question breakdown
  - **Recommendations**: Personalized, actionable tips
  - **Resources**: Professional help, educational content
  - **Education**: Videos, articles, and learning materials
  - **Progress**: Tracking and follow-up recommendations

- **Generic design** that works with any assessment type
- **PDF download** capability
- **Responsive design** for all devices

### 5. Integration Flow

Each screener follows the same integration pattern:

1. **Assessment Questions**: User completes screener-specific questions
2. **User Profile**: Collect additional information for personalization
3. **Processing**: Screener-specific processor generates comprehensive results
4. **Results Display**: Universal results component shows comprehensive report
5. **Actions**: PDF download, retake assessment, find resources

## Adding New Screeners

To add a new mental health screener (e.g., GAD-7, ASRS, AQ-10), follow these steps:

### Step 1: Define Screener-Specific Types
```typescript
// src/types/gad7.ts
export interface GAD7Result extends BaseAssessmentResult {
  totalScore: number
  severity: 'Minimal' | 'Mild' | 'Moderate' | 'Severe'
  anxietyLevel: 'low' | 'mild' | 'moderate' | 'severe'
}
```

### Step 2: Create Screener Processor
```typescript
// src/services/GAD7Processor.ts
export class GAD7Processor extends BaseAssessmentProcessor<GAD7Result> {
  protected assessmentType = 'GAD-7' as const
  
  calculateBaseResult(responses: AssessmentResponse[]): GAD7Result {
    // GAD-7 scoring algorithm
  }
  
  categorizeQuestions(responses: AssessmentResponse[]): DetailedScoreBreakdown[] {
    // Map to anxiety symptom categories
  }
  
  // ... implement other required methods
}
```

### Step 3: Create Screener Page
```typescript
// src/pages/GAD7ScreenerPage.tsx
export default function GAD7ScreenerPage() {
  // Same pattern as PHQ9ScreenerPage:
  // 1. Question flow
  // 2. User profile collection  
  // 3. Processor integration
  // 4. Comprehensive results display
}
```

### Step 4: Add to Router
```typescript
// src/App.tsx
<Route path="/screeners/gad7" element={<GAD7ScreenerPage />} />
```

## Key Benefits of This Architecture

### 1. **Consistency**
- All screeners provide the same comprehensive experience
- Uniform UI/UX across different assessment types
- Standardized result format and reporting

### 2. **Reusability**
- Core components work with any screener
- Base processor handles common functionality
- User profile system works across all assessments

### 3. **Scalability**
- Easy to add new screeners
- Minimal duplication of code
- Centralized updates benefit all screeners

### 4. **Professional Quality**
- Comprehensive reports with multiple analysis dimensions
- Personalized recommendations and resources
- PDF download capability for healthcare providers

### 5. **Maintainability**
- Clear separation of concerns
- Type-safe implementations
- Abstract base class ensures consistent interface

## Current Implementation Status

### ✅ Completed
- **Core architecture**: Types, base processor, UI components
- **PHQ-9 implementation**: Fully integrated with comprehensive results
- **User profile system**: Complete data collection and personalization
- **Results UI**: Tabbed interface with all sections
- **PDF functionality**: Print-to-PDF capability

### 🔄 Ready for Extension
- **GAD-7**: Anxiety assessment (processor framework ready)
- **ASRS**: Adult ADHD screening  
- **AQ-10**: Autism spectrum screening
- **PCL-5**: PTSD assessment
- **OCI-R**: OCD screening
- **MDQ**: Bipolar disorder screening
- **K10**: General psychological distress

## Technical Features

### AI Integration Ready
- Mock AI insights currently implemented
- Architecture ready for real AI integration (GitHub Models/DeepSeek)
- Personalized analysis based on user profile and responses

### Professional Resources
- Local provider search (framework ready)
- Emergency resources and crisis support
- Educational content (videos, articles, tips)

### Data Management
- Local storage for privacy
- Secure data handling
- Export capabilities for healthcare providers

## Future Enhancements

1. **Real AI Integration**: Connect to GitHub Models API for DeepSeek analysis
2. **Provider Directory**: Real-time local mental health provider search
3. **Progress Tracking**: Long-term assessment history and trends
4. **Advanced Analytics**: Population health insights and comparisons
5. **Integration APIs**: Healthcare provider system integration

This architecture ensures that MindScreen AI can easily scale to support all major mental health screening tools while maintaining the highest quality user experience and clinical utility.
