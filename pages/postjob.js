import React, { useState } from "react";
import { Job } from "@/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PostJob() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    budget_range: "",
    urgency: "flexible",
    location: "",
    contact_phone: "",
    contact_email: "",
    preferred_contact: "message"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setJobData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return jobData.title && jobData.description && jobData.category;
      case 2:
        return jobData.budget_range && jobData.urgency && jobData.location;
      case 3:
        return jobData.contact_email;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await Job.create(jobData);
      setSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 2000);
    } catch (error) {
      setError("Failed to post job. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-none shadow-2xl">
          <CardContent className="pt-12 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your job has been posted and contractors will start responding soon.
            </p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
            <p className="text-gray-600">Tell us about your project and get matched with contractors</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Job Details"}
              {currentStep === 2 && "Budget & Timeline"}
              {currentStep === 3 && "Contact Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Job Details */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Kitchen faucet repair, House painting, etc."
                    value={jobData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what needs to be done, any specific requirements, materials needed, etc."
                    className="h-32"
                    value={jobData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={jobData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="landscaping">Landscaping</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="handyman">Handyman</SelectItem>
                      <SelectItem value="tutoring">Tutoring</SelectItem>
                      <SelectItem value="moving">Moving</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Budget & Timeline */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Budget Range *</Label>
                  <RadioGroup value={jobData.budget_range} onValueChange={(value) => handleInputChange('budget_range', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under_100" id="under_100" />
                      <Label htmlFor="under_100">Under $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100_250" id="100_250" />
                      <Label htmlFor="100_250">$100 - $250</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="250_500" id="250_500" />
                      <Label htmlFor="250_500">$250 - $500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="500_1000" id="500_1000" />
                      <Label htmlFor="500_1000">$500 - $1,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000_2500" id="1000_2500" />
                      <Label htmlFor="1000_2500">$1,000 - $2,500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2500_plus" id="2500_plus" />
                      <Label htmlFor="2500_plus">$2,500+</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>When do you need this done? *</Label>
                  <RadioGroup value={jobData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="asap" id="asap" />
                      <Label htmlFor="asap">ASAP (within 24 hours)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="within_week" id="within_week" />
                      <Label htmlFor="within_week">Within a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="within_month" id="within_month" />
                      <Label htmlFor="within_month">Within a month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flexible" id="flexible" />
                      <Label htmlFor="flexible">I'm flexible</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Vancouver, BC or specific neighborhood"
                    value={jobData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email Address *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    placeholder="your@email.com"
                    value={jobData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone Number (Optional)</Label>
                  <Input
                    id="contact_phone"
                    placeholder="(555) 123-4567"
                    value={jobData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>How would you prefer contractors contact you?</Label>
                  <RadioGroup value={jobData.preferred_contact} onValueChange={(value) => handleInputChange('preferred_contact', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="message" id="message" />
                      <Label htmlFor="message">Through the app (recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email me directly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Call me</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Posting..." : "Post Job - Free"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
