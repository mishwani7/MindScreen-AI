# 🧠 MindScreen AI

**AI-Powered Mental Health Screening Platform**

A comprehensive, professional-grade mental health screening platform that combines clinically validated assessment tools with AI-powered analysis using DeepSeek-V3-0324 via GitHub Models.

![MindScreen AI](https://img.shields.io/badge/Status-Development-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3+-blue)

## ✨ Features

- **🔬 Clinically Validated Tools**: PHQ-9, GAD-7, ASRS, AQ-10, PCL-5, OCI-R, MDQ, K10
- **🤖 AI-Powered Analysis**: Advanced interpretation using DeepSeek-V3-0324
- **📊 Instant Results**: Real-time scoring and detailed reports
- **📄 PDF Reports**: Downloadable comprehensive assessment reports
- **🔒 Privacy-First**: No data stored on servers, HIPAA-conscious design
- **📱 Responsive Design**: Modern, accessible UI that works on all devices
- **🌙 Dark Mode**: Beautiful light and dark themes

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + ShadCN UI components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI**: DeepSeek-V3-0324 via GitHub Models API

## 🩺 Supported Mental Health Screeners

| Condition | Tool | Questions | Duration | Status |
|-----------|------|-----------|----------|--------|
| Depression | PHQ-9 | 9 | 3-5 min | ✅ |
| Anxiety | GAD-7 | 7 | 2-4 min | ✅ |
| ADHD | ASRS | 18 | 5-8 min | ✅ |
| Autism | AQ-10 | 10 | 3-5 min | ✅ |
| PTSD | PCL-5 | 20 | 5-10 min | ✅ |
| OCD | OCI-R | 18 | 4-6 min | ✅ |
| Bipolar | MDQ | 15 | 4-6 min | ✅ |
| General Distress | K10 | 10 | 3-5 min | ✅ |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Models API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindscreen-ai.git
   cd mindscreen-ai
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
   
   See [AI_SETUP.md](./AI_SETUP.md) for detailed AI configuration instructions.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🤖 AI Integration

MindScreen AI uses **DeepSeek-V3-0324** via GitHub Models to provide:

- **Personalized Analysis**: Deep interpretation of assessment results
- **Custom Recommendations**: Tailored suggestions based on response patterns  
- **Risk Assessment**: AI-identified risk and protective factors
- **Professional Referral Guidance**: Smart recommendations for seeking help
- **Support Resources**: Curated resources based on individual needs

**Note**: AI features require a GitHub Models API key. The platform works fully without AI, but provides enhanced insights when configured.

## 📊 Assessment Features

### Current: PHQ-9 Depression Screening ✅
- Step-by-step question navigation
- Real-time progress tracking
- Comprehensive results with severity classification
- AI-powered personalized insights (when configured)
- Risk assessment and safety recommendations
- Printable results for healthcare providers

### Coming Soon
- GAD-7 Anxiety Assessment
- ASRS ADHD Screening  
- Additional mental health tools
- PDF report generation
- Assessment history tracking

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mindscreen-ai.git
   cd mindscreen-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # ShadCN UI components
│   └── Layout.tsx       # Main layout component
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── ScreenersPage.tsx
│   └── AboutPage.tsx
├── store/               # Zustand state management
│   └── app-store.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_GITHUB_MODELS_API_KEY=your_github_models_api_key
VITE_GITHUB_MODELS_ENDPOINT=https://models.inference.ai.azure.com
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette (Primary: #6366F1, Accent: #FACC15)
- Plus Jakarta Sans font family
- ShadCN UI integration
- Dark mode support

## 🤖 AI Integration

This platform uses **DeepSeek-V3-0324** through GitHub Models for:

- ✅ Contextual analysis of screening responses
- ✅ Personalized insights and recommendations
- ✅ Risk level assessment
- ✅ Actionable next steps
- ✅ Professional-grade report generation

## 🔒 Privacy & Security

- **No Server Storage**: All data processed locally in browser
- **Encrypted Transmission**: Secure communication with AI services
- **HIPAA-Conscious**: Designed with healthcare privacy in mind
- **Open Source**: Full transparency in data handling
- **No Tracking**: No analytics or user behavior tracking

## 📚 Clinical Validation

All screening tools are based on established clinical assessments:

- **PHQ-9**: Validated for depression screening in primary care
- **GAD-7**: Gold standard for anxiety assessment
- **ASRS**: WHO-developed ADHD screening tool
- **AQ-10**: Short form autism spectrum quotient
- **PCL-5**: PTSD checklist for DSM-5
- **OCI-R**: Revised obsessive-compulsive inventory
- **MDQ**: Bipolar disorder screening questionnaire
- **K10**: Kessler psychological distress scale

## ⚠️ Important Disclaimer

This platform is for **educational and informational purposes only**. It is not intended to replace professional medical advice, diagnosis, or treatment. If you're experiencing mental health concerns, please consult with a qualified healthcare provider or mental health professional.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:

- Report bugs
- Suggest enhancements
- Submit pull requests
- Add new screening tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Developer**: Abu Zar Mishwani - AI & Mental Health Technology Specialist
- Clinical assessment tools developed by mental health professionals
- ShadCN for the beautiful UI component library
- DeepSeek team for the advanced AI model
- Open source community for the amazing tools and libraries

## 📞 Support

- 📧 Email: abuzarmishwani@mindscreen.ai
- 💬 Issues: [GitHub Issues](https://github.com/your-username/mindscreen-ai/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/mindscreen-ai/wiki)
- 👨‍💻 Developer: Abu Zar Mishwani

---

<div align="center">
  <strong>Built with ❤️ by Abu Zar Mishwani for mental health awareness and accessibility</strong>
</div>
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
