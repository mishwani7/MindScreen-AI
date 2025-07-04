# Contributing to MindScreen AI

Thank you for your interest in contributing to MindScreen AI! We're building a comprehensive mental health screening platform and welcome contributions from developers and mental health professionals.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and mental health screening principles

### Development Setup

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

## 🛠 Types of Contributions

### New Screening Tools
- Implement additional validated assessment tools (GAD-7, ASRS, etc.)
- Follow existing patterns in `/src/pages/` and `/src/services/`
- Ensure clinical accuracy and proper scoring

### AI Enhancement
- Improve AI prompts and response processing
- Add new AI-powered features
- Optimize AI integration patterns

### UI/UX Improvements
- Enhance accessibility features
- Improve responsive design
- Add new UI components following ShadCN patterns

## 📋 Development Guidelines

### Code Standards
- Use TypeScript strict mode with proper typing
- Follow existing interface patterns in `/src/types/`
- Use functional components with hooks
- Follow ShadCN UI component patterns
- Maintain accessibility standards (WCAG 2.1)

### Adding New Screeners

Required file structure:
```
src/
├── pages/NewScreenerPage.tsx          # Main component
├── services/NewScreenerProcessor.ts   # Scoring logic
├── data/newScreener.ts               # Questions data
└── types/assessment.ts               # Type definitions
```

### Clinical Accuracy Requirements
- Use only validated, published assessment tools
- Implement exact scoring algorithms from clinical literature
- Include appropriate disclaimers and safety information
- Test against known case examples

## 🚦 Contribution Process

1. **Create an issue** for discussion before starting work
2. **Create a feature branch** from main
3. **Follow naming convention**: `feature/screener-name`, `fix/issue-description`
4. **Submit a pull request** with clear description

### PR Guidelines
- Include clear description of changes
- Add screenshots for UI changes
- Confirm clinical accuracy for new screeners
- Ensure tests pass and no errors in console

## 🔒 Privacy & Security

- Never store sensitive user data
- Process everything client-side when possible
- Use secure transmission for AI requests
- Follow HIPAA-conscious design principles
- Never commit API keys to repository

##  Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: abuzarmishwani@mindscreen.ai for sensitive matters

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make mental health screening more accessible! 🧠💙
