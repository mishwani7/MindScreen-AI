import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { User, Shield, ArrowRight, AlertCircle } from 'lucide-react'
import type { UserProfile } from '@/types/assessment'

interface UserProfileFormProps {
  onComplete: (profile: UserProfile) => void
  onSkip: () => void
}

export function UserProfileForm({ onComplete, onSkip }: UserProfileFormProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: 'prefer-not-to-say'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!profile.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!profile.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!profile.age || profile.age < 13 || profile.age > 120) {
      newErrors.age = 'Please enter a valid age (13-120)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(profile as UserProfile)
    }
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 relative animate-fade-in">
      {/* Keep floating elements minimal for clean look */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-blue-200/20 dark:from-blue-950/20 dark:to-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-blue-100/20 dark:from-blue-900/20 dark:to-blue-950/20 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Neural network inspired floating dots */}
        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-blue-400/70 rounded-full animate-float-slow">
          <div className="absolute inset-0 bg-blue-400/50 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-500/70 rounded-full animate-float-medium" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0 bg-blue-500/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl mb-4 shadow-lg animate-float">
              <User className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Personal{' '}
            <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Information
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Just a few details to personalize your results and recommendations
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-8 bg-card/70 backdrop-blur-sm border border-border/30 shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  Your Privacy is Protected
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your information is encrypted and never shared. You can skip this step if you prefer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simplified Form */}
        <Card className="shadow-lg bg-card/70 backdrop-blur-sm border-border/30 animate-slide-up hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold">Basic Information</CardTitle>
            <CardDescription className="text-lg">
              Essential details for personalized insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-base font-semibold">First Name *</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className={`h-12 text-base rounded-xl border-2 transition-all duration-300 ${
                      errors.firstName 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-border/50 focus:border-blue-500 hover:border-border/80'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-base font-semibold">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className={`h-12 text-base rounded-xl border-2 transition-all duration-300 ${
                      errors.lastName 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-border/50 focus:border-blue-500 hover:border-border/80'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="age" className="text-base font-semibold">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="120"
                    value={profile.age || ''}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') {
                        handleInputChange('age', 0)
                      } else {
                        const parsedAge = parseInt(value)
                        if (!isNaN(parsedAge)) {
                          handleInputChange('age', parsedAge)
                        }
                      }
                    }}
                    placeholder="Enter your age"
                    className={`h-12 text-base rounded-xl border-2 transition-all duration-300 ${
                      errors.age 
                        ? 'border-red-500 focus:border-red-600' 
                        : 'border-border/50 focus:border-blue-500 hover:border-border/80'
                    }`}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {errors.age}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Gender</Label>
                  <RadioGroup
                    value={profile.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-border/50 hover:border-border/80 transition-all duration-300">
                      <RadioGroupItem value="male" id="male" className="border-2" />
                      <Label htmlFor="male" className="cursor-pointer font-medium">Male</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-border/50 hover:border-border/80 transition-all duration-300">
                      <RadioGroupItem value="female" id="female" className="border-2" />
                      <Label htmlFor="female" className="cursor-pointer font-medium">Female</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-border/50 hover:border-border/80 transition-all duration-300">
                      <RadioGroupItem value="non-binary" id="non-binary" className="border-2" />
                      <Label htmlFor="non-binary" className="cursor-pointer font-medium">Non-binary</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-border/50 hover:border-border/80 transition-all duration-300">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" className="border-2" />
                      <Label htmlFor="prefer-not-to-say" className="cursor-pointer font-medium">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Location - Optional */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Label className="text-lg font-bold">Location (Optional)</Label>
                  <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                    Helps find local resources
                  </span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-base font-semibold">Country</Label>
                    <Input
                      id="country"
                      value={profile.country || ''}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="e.g., United States"
                      className="h-12 text-base rounded-xl border-2 border-border/50 focus:border-blue-500 hover:border-border/80 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-base font-semibold">City</Label>
                    <Input
                      id="city"
                      value={profile.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g., New York"
                      className="h-12 text-base rounded-xl border-2 border-border/50 focus:border-blue-500 hover:border-border/80 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-base font-semibold">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={profile.zipCode || ''}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="e.g., 10001"
                      className="h-12 text-base rounded-xl border-2 border-border/50 focus:border-blue-500 hover:border-border/80 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-2xl p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Location information helps us recommend mental health resources and providers in your area
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/50">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 text-lg rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Continue to Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  onClick={onSkip}
                  className="flex-1 sm:flex-initial px-6 py-4 text-lg rounded-2xl border-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Skip for now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
