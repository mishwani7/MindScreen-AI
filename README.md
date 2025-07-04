# 🧠 MindScreen AI

**AI-Powered Mental Health Screening Platform**

A comprehensive, professional-grade mental health screening platform that combines clinically validated assessment tools with AI-powered analysis using GPT-4o and DeepSeek-V3 via GitHub Models.

![MindScreen AI](https://img.shields.io/badge/Status-Live-green)
![React](https://img.shields.io/badge/React-19+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4+-blue)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🌐 Live Preview

🚀 **[Visit MindScreen AI](https://mind-screen-ai.vercel.app)** - Experience the live platform

✨ **Features Available:**
- ✅ **PHQ-9 Depression Screening**: Complete assessment with AI analysis
- ✅ **GPT-4o AI Analysis**: Advanced personalized insights
- ✅ **PDF Reports**: Downloadable comprehensive reports
- ✅ **Modern UI**: Responsive design with dark mode
- ✅ **Location Services**: Smart resource recommendations

## ✨ Current Features

- **🔬 PHQ-9 Depression Screening**: Fully implemented, clinically validated assessment
- **🤖 AI-Powered Analysis**: Advanced interpretation using GPT-4o and DeepSeek-V3 models
- **📊 Instant Results**: Real-time scoring with severity classification
- **📄 PDF Reports**: Downloadable comprehensive assessment reports
- **🔒 Privacy-First**: No data stored on servers, HIPAA-conscious design
- **📱 Responsive Design**: Modern, accessible UI that works on all devices
- **🌙 Dark Mode**: Beautiful light and dark themes
- **🌍 Location Services**: Smart location detection for personalized resources

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + ShadCN UI components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI**: GPT-4o (Primary) + DeepSeek-V3 (Backup) via GitHub Models API
- **PDF Generation**: React PDF Renderer
- **Deployment**: Vercel with automatic CI/CD

## 🩺 Mental Health Screeners Status

| Condition | Tool | Questions | Duration | Status |
|-----------|------|-----------|----------|--------|
| Depression | PHQ-9 | 9 | 3-5 min | ✅ **Live** |
| Anxiety | GAD-7 | 7 | 2-4 min | 🚧 In Development |
| ADHD | ASRS | 18 | 5-8 min | 📋 Planned |
| Autism | AQ-10 | 10 | 3-5 min | 📋 Planned |
| PTSD | PCL-5 | 20 | 5-10 min | 📋 Planned |
| OCD | OCI-R | 18 | 4-6 min | 📋 Planned |
| Bipolar | MDQ | 15 | 4-6 min | 📋 Planned |
| General Distress | K10 | 10 | 3-5 min | 📋 Planned |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Models API key (for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mishwani7/MindScreen-AI.git
   cd MindScreen-AI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure AI Integration (Optional but Recommended)**

   ```bash
   cp .env.example .env
   # Add your GitHub Models API key to .env
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   ```text
   http://localhost:5173
   ```

## 🤖 AI Integration

MindScreen AI uses **GPT-4o (Primary)** and **DeepSeek-V3 (Backup)** via GitHub Models to provide:

- **Personalized Analysis**: Deep interpretation of assessment results
- **Custom Recommendations**: Tailored suggestions based on response patterns
- **Risk Assessment**: AI-identified risk and protective factors
- **Professional Referral Guidance**: Smart recommendations for seeking help
- **Support Resources**: Curated resources based on individual needs
- **Multi-Model Reliability**: Automatic fallback between AI models for consistent service

**Note**: AI features require a GitHub Models API key. The platform works fully without AI, but provides enhanced insights when configured.

## 📊 Current Implementation: PHQ-9 Depression Screening

### Features

- Step-by-step question navigation with progress tracking
- Real-time scoring with clinical severity classification
- Comprehensive results page with detailed interpretation
- AI-powered personalized insights (when configured)
- Risk assessment and safety recommendations
- PDF report generation for healthcare providers
- Location-based resource recommendations

### Clinical Accuracy

- Based on the validated PHQ-9 assessment tool
- Implements standard clinical scoring algorithms
- Provides severity classifications: Minimal, Mild, Moderate, Moderately Severe, Severe
- Includes appropriate disclaimers and safety information

## 🏗 Project Structure

```text
src/
├── components/           # Reusable UI components
│   ├── ui/              # ShadCN UI components
│   ├── Layout.tsx       # Main layout component
│   ├── CleanResults.tsx # Results display component
│   └── PDFReport.tsx    # PDF generation component
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   ├── ScreenersPage.tsx # Screeners overview
│   ├── PHQ9ScreenerPage.tsx # PHQ-9 implementation
│   └── AboutPage.tsx    # About page
├── services/            # Business logic
│   ├── aiService.ts     # AI integration
│   ├── PHQ9Processor.ts # PHQ-9 scoring logic
│   └── locationService.ts # Location services
├── store/               # Zustand state management
│   └── app-store.ts
├── data/                # Static data and configurations
│   ├── phq9.ts         # PHQ-9 questions
│   └── countriesAndCities.ts # Location data
└── types/               # TypeScript type definitions
    └── assessment.ts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_GITHUB_TOKEN=your_github_models_api_key_here
```

### AI Integration Setup

1. Get a GitHub Models API key from [GitHub Models](https://github.com/marketplace/models)
2. Add the key to your `.env` file
3. The platform will automatically enable AI features when configured

## 🚀 Deployment

This project is configured for automatic deployment on Vercel:

### Quick Deployment Steps

1. **Go to [Vercel](https://vercel.com)**
2. **Connect GitHub**: Import your GitHub repository `mishwani7/MindScreen-AI`
3. **Configure Environment Variables** (in Vercel Dashboard):
   - `VITE_GITHUB_TOKEN` = Your GitHub Models API key
4. **Deploy**: Vercel will automatically build and deploy

### Environment Variables Setup

In your Vercel dashboard, add:

```env
VITE_GITHUB_TOKEN=your_github_models_api_key_here
```

### AI Configuration

The platform uses **GPT-4o as primary** and **DeepSeek-V3 as backup** for reliability:

- Primary AI: GPT-4o (more stable for production)
- Backup AI: DeepSeek-V3 (automatic fallback)
- Multi-key support for rate limit handling

### Auto-Deploy Setup

✅ Already configured! Every push to `main` branch triggers automatic deployment.

## 🔒 Privacy & Security

- **No Server Storage**: All data processed locally in browser
- **Encrypted Transmission**: Secure communication with AI services
- **HIPAA-Conscious**: Designed with healthcare privacy in mind
- **Open Source**: Full transparency in data handling
- **No Tracking**: No analytics or user behavior tracking

## 📚 Clinical Validation

### PHQ-9 (Patient Health Questionnaire-9)

- **Purpose**: Depression screening and severity measurement
- **Validation**: Extensively validated in primary care and psychiatric settings
- **Scoring**: 0-27 scale with established severity thresholds
- **Clinical Use**: Widely used by healthcare professionals worldwide

### Upcoming Tools

All planned screening tools are based on established clinical assessments with published validation studies and are commonly used in healthcare settings.

## ⚠️ Important Disclaimer

This platform is for **educational and informational purposes only**. It is not intended to replace professional medical advice, diagnosis, or treatment. If you're experiencing mental health concerns, please consult with a qualified healthcare provider or mental health professional.

In case of emergency or thoughts of self-harm, please contact:

- **Emergency Services**: 911 (US) or your local emergency number
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988

## 🤝 Contributing

We welcome contributions from developers, mental health professionals, and anyone passionate about improving mental health accessibility through technology!

### 🚀 Quick Start for Contributors

#### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and mental health screening principles

#### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/MindScreen-AI.git
   cd MindScreen-AI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Add your GitHub Models API key for AI features
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

### 🛠 Types of Contributions

#### New Screening Tools

- Implement additional validated assessment tools (GAD-7, ASRS, etc.)
- Follow existing patterns in `/src/pages/` and `/src/services/`
- Ensure clinical accuracy and proper scoring

#### AI Enhancement

- Improve AI prompts and response processing
- Add new AI-powered features
- Optimize AI integration patterns

#### UI/UX Improvements

- Enhance accessibility features
- Improve responsive design
- Add new UI components following ShadCN patterns

### 📋 Development Guidelines

#### Code Standards

- Use TypeScript strict mode with proper typing
- Follow existing interface patterns in `/src/types/`
- Use functional components with hooks
- Follow ShadCN UI component patterns
- Maintain accessibility standards (WCAG 2.1)

#### Adding New Screeners

Required file structure:

```text
src/
├── pages/NewScreenerPage.tsx          # Main component
├── services/NewScreenerProcessor.ts   # Scoring logic
├── data/newScreener.ts               # Questions data
└── types/assessment.ts               # Type definitions
```

#### Clinical Accuracy Requirements

- Use only validated, published assessment tools
- Implement exact scoring algorithms from clinical literature
- Include appropriate disclaimers and safety information
- Test against known case examples

### 🚦 Contribution Process

1. **Create an issue** for discussion before starting work
2. **Create a feature branch** from main
3. **Follow naming convention**: `feature/screener-name`, `fix/issue-description`
4. **Submit a pull request** with clear description

#### PR Guidelines

- Include clear description of changes
- Add screenshots for UI changes
- Confirm clinical accuracy for new screeners
- Ensure tests pass and no errors in console

### 🔒 Privacy & Security Guidelines

- Never store sensitive user data
- Process everything client-side when possible
- Use secure transmission for AI requests
- Follow HIPAA-conscious design principles
- Never commit API keys to repository

### 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: abuzarmishwani742@gmail.com for sensitive matters

## 🛣 Roadmap

### Phase 1: Foundation (✅ Complete)

- PHQ-9 Depression Screening
- AI Integration with GPT-4o and DeepSeek-V3
- Modern UI with ShadCN components
- PDF Report generation
- Location-based services

### Phase 2: Expansion (🚧 Current)

- GAD-7 Anxiety Assessment
- Enhanced AI analysis
- User experience improvements

### Phase 3: Comprehensive Platform

- Complete suite of 8 mental health screeners
- Advanced analytics and insights
- Multi-language support
- Healthcare provider dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Lead Developer**: [Abu Zar Mishwani](https://github.com/mishwani7)
- Clinical assessment tools developed by mental health professionals
- ShadCN for the beautiful UI component library
- GPT-4o and DeepSeek teams for the advanced AI models
- Open source community for the amazing tools and libraries

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/mishwani7/MindScreen-AI/issues)
- **Email**: abuzarmishwani742@gmail.com

---

**Built with ❤️ for mental health awareness and accessibility**

*Making mental health screening accessible to everyone*
