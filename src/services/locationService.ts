import type { EmergencyResource } from '../types/assessment';

// Location info interface (local to this service)
interface LocationInfo {
  country: string;
  city: string;
  zipCode?: string;
}

// Medical provider interface for AI service (compatible with ProfessionalProvider)
interface MedicalProvider {
  name: string;
  type: 'clinic' | 'hospital' | 'private-practice';
  address: string;
  phone: string;
  description: string;
  rating?: number;
  website?: string;
}

// AI-powered location resource service
export class AILocationService {
  private static readonly baseURL = 'https://models.github.ai/inference'
  private static readonly apiKeys = [
    import.meta.env.VITE_GITHUB_TOKEN,
    import.meta.env.VITE_GITHUB_MODELS_API_KEY,
    import.meta.env.VITE_GITHUB_BACKUP_KEY
  ].filter(key => key && key.trim() !== '' && key !== 'your_github_models_api_key_here')
  
  private static currentKeyIndex = 0

  private static getNextApiKey(): string | null {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length
    return this.apiKeys[this.currentKeyIndex] || null
  }

  /**
   * Get location-based mental health resources using AI
   */
  static async getLocationResources(
    country: string, 
    city: string, 
    resourceType: 'emergency' | 'medical' | 'both' = 'both'
  ): Promise<{
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  }> {
    // Getting location-based resources
    
    try {
      return await this.tryLocationAPIWithFallback(country, city, resourceType)
    } catch {
      // Location service failed, using fallback resources
      return this.getFallbackResources(country, city)
    }
  }

  private static async tryLocationAPIWithFallback(
    country: string, 
    city: string, 
    resourceType: string
  ): Promise<{
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  }> {
    let lastError: Error | null = null
    const maxRetries = this.apiKeys.length
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiKey = this.apiKeys[this.currentKeyIndex]
        // Location API call attempt
        
        const result = await this.makeLocationAPICall(country, city, resourceType, apiKey)
        // Location resources retrieved successfully
        return result
        
      } catch (error: unknown) {
        lastError = error as Error
        
        if (lastError.message.includes('429')) {
          // Rate limit hit, trying next key
          this.getNextApiKey()
          continue
        } else {
          throw error
        }
      }
    }
    
    throw lastError
  }

  private static async makeLocationAPICall(
    country: string,
    city: string, 
    resourceType: string,
    apiKey: string
  ): Promise<{
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  }> {
    const prompt = this.buildLocationPrompt(country, city, resourceType)
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: this.getLocationSystemPrompt()
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'deepseek/DeepSeek-V3-0324',
        temperature: 0.3,
        top_p: 0.1,
        max_tokens: 2048
      })
    })

    if (!response.ok) {
      throw new Error(`AI Location API failed: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response content from AI Location service')
    }

    return this.parseLocationResponse(aiResponse)
  }

  private static buildLocationPrompt(country: string, city: string, resourceType: string): string {
    return `I need specific mental health resources for someone located in ${city}, ${country}.

Please provide:

${resourceType === 'emergency' || resourceType === 'both' ? `
EMERGENCY CONTACTS (3-5 items):
- Crisis hotlines with actual phone numbers
- Suicide prevention services
- Emergency mental health services
- Include both local and national numbers where available
` : ''}

${resourceType === 'medical' || resourceType === 'both' ? `
MEDICAL CENTERS (3-5 items):
- Mental health clinics in ${city}
- Hospitals with psychiatric services  
- Community health centers
- Private practice mental health providers
- Include actual names, addresses, and contact information where possible
` : ''}

Focus on:
- Real, existing services (not generic examples)
- Current contact information
- Services that specifically handle mental health and crisis situations
- Both government/public and private options if available
- Include specialties (depression, anxiety, crisis intervention, etc.)

Format your response as JSON matching this exact structure:
{
  "emergencyResources": [
    {
      "name": "Actual service name",
      "phone": "Actual phone number",
      "description": "What services they provide",
      "availability": "Hours/availability",
      "type": "crisis-line|emergency-services|text-support"
    }
  ],
  "medicalProviders": [
    {
      "name": "Actual facility/provider name",
      "type": "clinic|hospital|private-practice",
      "address": "Actual address in ${city}",
      "phone": "Contact number",
      "description": "Services and specialties",
      "rating": 4.2,
      "website": "website if known"
    }
  ]
}`
  }

  private static getLocationSystemPrompt(): string {
    return `You are a specialized assistant for finding real mental health resources in specific geographic locations. Your role is to provide accurate, current information about actual mental health services, crisis lines, and medical facilities.

Guidelines:
- Provide REAL, existing resources - not generic examples
- Include actual phone numbers, addresses, and facility names
- Focus on mental health specific services
- Include both crisis/emergency resources and ongoing care options
- Verify information is current and accurate
- Include local emergency numbers and national backup numbers
- Consider regional healthcare systems and cultural contexts
- For areas with limited resources, provide the best available options plus national alternatives

Always respond in valid JSON format exactly matching the requested structure.
Do not include explanatory text outside the JSON response.`
  }

  private static parseLocationResponse(response: string): {
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  } {
    try {
      // Clean the response to extract JSON
      let jsonStr = response.trim()
      
      // Remove any markdown code blocks
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/, '').replace(/```$/, '')
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/, '').replace(/```$/, '')
      }
      
      const parsed = JSON.parse(jsonStr)
      
      return {
        emergencyResources: parsed.emergencyResources || [],
        medicalProviders: parsed.medicalProviders || []
      }
    } catch (error) {
      console.error('Failed to parse AI location response:', error)
      return {
        emergencyResources: [],
        medicalProviders: []
      }
    }
  }

  private static getFallbackResources(country: string, city: string): {
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  } {
    // Static fallback resources for common countries
    const fallbackEmergency: Record<string, EmergencyResource[]> = {
      'United States': [
        {
          name: '988 Suicide & Crisis Lifeline',
          phone: '988',
          description: '24/7 crisis support and suicide prevention',
          availability: '24/7',
          type: 'crisis-line'
        },
        {
          name: 'Crisis Text Line',
          phone: 'Text HOME to 741741',
          description: 'Free, confidential crisis support via text',
          availability: '24/7',
          type: 'text-support'
        }
      ],
      'Pakistan': [
        {
          name: 'Rescue 1122',
          phone: '1122',
          description: 'Emergency rescue and medical services',
          availability: '24/7',
          type: 'emergency-services'
        },
        {
          name: 'Mental Health Helpline',
          phone: '1166',
          description: 'Mental health crisis support',
          availability: '24/7',
          type: 'crisis-line'
        }
      ]
    }

    return {
      emergencyResources: fallbackEmergency[country] || [
        {
          name: 'Local Emergency Services',
          phone: 'Contact local emergency services',
          description: 'Reach out to local mental health crisis services',
          availability: 'Varies by location',
          type: 'emergency-services'
        }
      ],
      medicalProviders: [
        {
          name: `Mental Health Services - ${city}`,
          type: 'clinic',
          address: `${city}, ${country}`,
          phone: 'Contact local directory',
          description: 'Local mental health clinic services',
          rating: undefined,
          website: undefined
        }
      ]
    }
  }
}

// IP-based location detection service  
export class IPLocationService {
  static async getUserLocation(): Promise<{ country: string; city: string } | null> {
    // Getting user location via IP
    try {
      // Use ipapi.co for IP-based location detection
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('IP location service failed');
      
      const data = await response.json();
      const result = {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown'
      };
      
      // User location detected
      return result;
    } catch (error) {
      console.warn('IP-based location detection failed:', error);
      return null;
    }
  }
}

// Main location service with AI integration
export class LocationService {
  /**
   * Get emergency resources for a specific country using AI
   */
  static async getEmergencyResources(country: string, city: string = ''): Promise<EmergencyResource[]> {
    // Getting emergency resources
    
    const resources = await AILocationService.getLocationResources(
      country, 
      city || 'general area', 
      'emergency'
    );
    
    return resources.emergencyResources;
  }

  /**
   * Get medical providers for a specific city and country using AI
   */
  static async getMedicalProviders(city: string, country: string): Promise<MedicalProvider[]> {
    // Getting medical providers
    
    const resources = await AILocationService.getLocationResources(
      country, 
      city, 
      'medical'
    );
    
    return resources.medicalProviders;
  }

  /**
   * Comprehensive location-based resource lookup using AI
   */
  static async getLocationBasedResources(locationInfo: LocationInfo): Promise<{
    emergencyResources: EmergencyResource[];
    medicalProviders: MedicalProvider[];
  }> {
    const { country, city } = locationInfo;
    // Getting comprehensive resources

    // Use AI to get both emergency and medical resources
    return AILocationService.getLocationResources(country, city, 'both');
  }

  /**
   * Validate and normalize location input
   */
  static normalizeLocation(country: string, city: string): LocationInfo {
    return {
      country: country.trim() || 'Unknown',
      city: city.trim() || 'Unknown'
    };
  }

  /**
   * Check if location services are available
   */
  static async checkServiceAvailability(): Promise<{
    ipLocation: boolean;
    aiLocationService: boolean;
  }> {
    // Checking service availability
    
    const checks = await Promise.allSettled([
      fetch('https://ipapi.co/json/', { method: 'HEAD' }),
      // Simplified AI service check
      Promise.resolve(true)
    ]);

    const result = {
      ipLocation: checks[0].status === 'fulfilled',
      aiLocationService: checks[1].status === 'fulfilled'
    };
    
    // Service availability checked
    return result;
  }
}

export default LocationService;
