# Contributing to MindScreen AI

Thank you for your interest in contributing to MindScreen AI! We welcome contributions from developers, mental health professionals, and anyone passionate about improving mental health accessibility through technology.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and mental health screening principles
- GitHub Models API key (for testing AI features)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/mishwani7/MindScreen-AI.git
   cd MindScreen-AI
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Add your GitHub Models API key to .env for testing
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠 Types of Contributions

### 🧠 New Mental Health Screening Tools

We're actively looking for contributors to implement additional validated assessment tools:

**Priority Tools:**
- GAD-7 (Anxiety Assessment) - 🚧 In Development
- ASRS (ADHD Screening) - 📋 Planned
- AQ-10 (Autism Screening) - 📋 Planned
- PCL-5 (PTSD Assessment) - 📋 Planned
- OCI-R (OCD Screening) - 📋 Planned
- MDQ (Bipolar Screening) - 📋 Planned
- K10 (General Distress) - 📋 Planned

**Implementation Requirements:**
- Follow existing patterns in `/src/pages/` and `/src/services/`
- Use only validated, published assessment tools
- Implement exact scoring algorithms from clinical literature
- Include appropriate disclaimers and safety information

### 🤖 AI Enhancement

- Improve AI prompts and response processing
- Add new AI-powered features
- Optimize AI integration patterns
- Enhance demo mode functionality

### 🎨 UI/UX Improvements

- Enhance accessibility features (WCAG 2.1 compliance)
- Improve responsive design
- Add new UI components following ShadCN patterns
- Dark mode enhancements

### 📚 Documentation & Educational Content

- Improve documentation clarity
- Add educational resources about mental health
- Create user guides and tutorials
- Translate content for international users

## 📋 Development Guidelines

### Code Standards

- **TypeScript**: Use strict mode with proper typing
- **Components**: Functional components with hooks only
- **Styling**: Follow ShadCN UI component patterns
- **State**: Use Zustand for global state management
- **Forms**: React Hook Form + Zod validation
- **Accessibility**: Maintain WCAG 2.1 standards
- **Testing**: Write tests for new features

### File Structure for New Screeners

When adding a new screening tool, create these files:

```text
src/
├── pages/
│   └── NewScreenerPage.tsx          # Main assessment component
├── services/
│   └── NewScreenerProcessor.ts      # Scoring and analysis logic
├── data/
│   └── newScreener.ts              # Questions and configuration
└── types/
    └── assessment.ts               # Update with new types
```

### Clinical Accuracy Requirements

**CRITICAL**: Mental health assessments must be clinically accurate.

- ✅ Use only validated, published assessment tools
- ✅ Implement exact scoring algorithms from clinical literature
- ✅ Include appropriate disclaimers and safety information
- ✅ Test against known case examples
- ✅ Have mental health professional review if possible

### Code Quality Checklist

- [ ] TypeScript strict mode passes
- [ ] No console errors or warnings
- [ ] Responsive design works on all screen sizes
- [ ] Accessibility standards met
- [ ] Clinical accuracy verified
- [ ] Demo mode functions properly
- [ ] AI integration works when configured

## 🚦 Contribution Process

### 1. Planning

- **Create an issue** for discussion before starting major work
- **Join discussions** on existing issues
- **Ask questions** if you're unsure about implementation

### 2. Development

- **Create a feature branch** from main:
  ```bash
  git checkout -b feature/gad7-screener
  # or
  git checkout -b fix/accessibility-improvements
  ```
- **Follow naming convention**: 
  - `feature/screener-name` for new tools
  - `fix/issue-description` for bug fixes
  - `docs/improvement-description` for documentation

### 3. Testing

- **Test thoroughly** on different devices and browsers
- **Verify clinical accuracy** for assessment tools
- **Test both AI and demo modes**
- **Check accessibility** with screen readers

### 4. Pull Request

- **Create a clear PR description** including:
  - What changes were made
  - Why they were made
  - How to test the changes
  - Screenshots for UI changes
- **Link to related issues**
- **Add appropriate labels**

## 📝 Pull Request Guidelines

### PR Checklist

- [ ] **Clear title** describing the change
- [ ] **Detailed description** of what was implemented
- [ ] **Screenshots** for UI changes
- [ ] **Clinical accuracy confirmed** for new screeners
- [ ] **No TypeScript errors**
- [ ] **No console warnings**
- [ ] **Responsive design tested**
- [ ] **Accessibility standards maintained**
- [ ] **Both AI and demo modes work**

### PR Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature (screening tool)
- [ ] UI/UX improvement
- [ ] Documentation update
- [ ] AI enhancement

## Clinical Validation (for screening tools)
- [ ] Based on published, validated assessment
- [ ] Scoring algorithm matches clinical literature
- [ ] Appropriate disclaimers included
- [ ] Tested against known examples

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with screen reader
- [ ] AI mode tested
- [ ] Demo mode tested

## Screenshots (if applicable)
Add screenshots here.
```

## 🔒 Privacy & Security Guidelines

- **Never store sensitive user data**
- **Process everything client-side when possible**
- **Use secure transmission** for AI requests
- **Follow HIPAA-conscious design principles**
- **Never commit API keys** to repository
- **Respect user privacy** in all implementations

## 🆘 Getting Help

### Where to Ask Questions

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: abuzarmishwani742@gmail.com for sensitive matters

### Common Questions

**Q: How do I test AI features without my own API key?**
A: The platform has a robust demo mode. You can test all functionality without AI keys.

**Q: I'm not a mental health professional. Can I still contribute?**
A: Absolutely! We need developers for UI/UX, technical improvements, and documentation.

**Q: How do I ensure clinical accuracy?**
A: Always reference published clinical literature and include citations in your PR.

## 🎯 Roadmap Priorities

### Immediate Needs (Help Wanted!)

1. **GAD-7 Implementation** - Anxiety assessment
2. **Accessibility Improvements** - Screen reader optimization
3. **Mobile UX Enhancements** - Better mobile experience
4. **Documentation** - User guides and tutorials

### Future Goals

- Multi-language support
- Healthcare provider dashboard
- Advanced analytics
- Integration with health records

## 🏆 Recognition

Contributors will be:
- Listed in the README acknowledgments
- Credited in release notes
- Given appropriate GitHub repository permissions
- Invited to join our contributor community

---

Thank you for contributing to MindScreen AI! Together, we're making mental health screening more accessible to everyone. 💙
