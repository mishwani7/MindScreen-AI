# AI Integration Setup Guide

## GitHub Models API Configuration

MindScreen AI uses DeepSeek-V3-0324 via GitHub Models to provide AI-powered insights and personalized recommendations for mental health screening results.

### Step 1: Get Your GitHub Models API Key

1. **Visit GitHub Models**: Go to [GitHub Models](https://github.com/marketplace/models)
2. **Sign in**: Use your GitHub account to sign in
3. **Access DeepSeek-V3**: Navigate to the DeepSeek-V3-0324 model
4. **Generate API Key**: Follow GitHub's instructions to generate your API key
5. **Copy the Key**: Save your API key securely

### Step 2: Configure Your Environment

1. **Copy Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Add Your API Key**:
   Open `.env` and add your GitHub Models API key:
   ```env
   VITE_GITHUB_MODELS_API_KEY=your_actual_api_key_here
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### Step 3: Verify AI Integration

1. **Complete an Assessment**: Take the PHQ-9 screening
2. **Check for AI Section**: Look for the "AI-Powered Insights" section in your results
3. **Review AI Analysis**: The AI will provide personalized interpretation and recommendations

### Features Enabled with AI Integration

- **Personalized Analysis**: Detailed interpretation of your specific response patterns
- **Custom Recommendations**: Tailored suggestions based on your individual results
- **Risk Assessment**: AI-identified risk factors and protective factors
- **Professional Referral Guidance**: Smart recommendations for when to seek professional help
- **Support Resources**: Curated resources based on your specific needs
- **Follow-up Suggestions**: Personalized guidance for ongoing mental health management

### Troubleshooting

**"AI analysis is currently unavailable"**
- Check that your API key is correctly set in the `.env` file
- Ensure you have restarted the development server after adding the key
- Verify your GitHub Models account has access to DeepSeek-V3-0324

**AI section not appearing**
- The AI analysis only appears when an API key is configured
- Check browser console for any error messages
- Try refreshing the page after completing an assessment

### Privacy & Security

- Your API key is only used to communicate with GitHub Models
- Assessment responses are sent to AI service only for analysis
- No personal data is stored on external servers
- All communication is encrypted and secure

### Cost Considerations

- GitHub Models may have usage limits or costs
- Check GitHub Models pricing for DeepSeek-V3-0324
- Consider setting up usage monitoring if available

## Developer Notes

**Abu Zar Mishwani** has designed the AI integration to:
- Provide clinically-informed insights while maintaining professional boundaries
- Offer compassionate, evidence-based recommendations
- Prioritize user safety, especially for high-risk assessments
- Maintain fallback functionality when AI is unavailable

For technical support or questions about the AI integration, refer to the main project documentation or contact the developer.
