# MindScreen AI - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is MindScreen AI, a comprehensive mental health screening platform that combines clinically validated assessment tools with AI-powered analysis using DeepSeek-V3-0324 via GitHub Models.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + ShadCN UI components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI**: DeepSeek-V3-0324 via GitHub Models API

## Architecture Guidelines

- Use TypeScript strict mode and proper type definitions
- Follow ShadCN UI component patterns for consistency
- Implement proper error boundaries and loading states
- Use Zustand for global state management
- Maintain separation of concerns between UI, business logic, and data
- Follow accessibility best practices

## Mental Health Screening Tools

The platform supports these validated clinical assessment tools:

- **PHQ-9**: Depression screening (9 questions)
- **GAD-7**: Anxiety assessment (7 questions)
- **ASRS**: Adult ADHD screening (18 questions)
- **AQ-10**: Autism spectrum screening (10 questions)
- **PCL-5**: PTSD assessment (20 questions)
- **OCI-R**: OCD screening (18 questions)
- **MDQ**: Bipolar disorder screening (15 questions)
- **K10**: General psychological distress (10 questions)

## Code Style

- Use functional components with hooks
- Prefer composition over inheritance
- Use proper TypeScript interfaces and types
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Keep components focused and single-purpose
- Use proper error handling and loading states

## AI Integration

- Use GitHub Models API for DeepSeek-V3-0324 integration
- Implement proper error handling for AI responses
- Structure prompts for mental health context appropriately
- Ensure AI responses are contextually relevant and helpful

## Privacy & Security

- No sensitive data stored on servers
- Use local storage for temporary data only
- Implement proper data encryption for transmission
- Follow HIPAA-conscious design principles
- Maintain user privacy throughout the application

## Development Notes

- This is a step-by-step development process
- Test each module thoroughly before moving to the next
- Prioritize user experience and accessibility
- Ensure all screening tools are implemented accurately
- Maintain clinical accuracy in all assessments
