"use client";
import type { FC } from 'react';
import { useState } from 'react';
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';

/**
 * Smart Planning Questionnaire page with split layout matching onboarding.
 * Left: Blue panel with logo, stepper, and description. Right: Card for questions.
 * Uses shadcn/ui components and Tailwind for styling.
 * @returns {JSX.Element}
 */
const steps = [
  { step: 1, title: 'Destination', description: 'Where are you going?' },
  { step: 2, title: 'Dates', description: 'When are you traveling?' },
  { step: 3, title: 'Gender', description: "What's your gender?" },
  { step: 4, title: 'Trip Type', description: 'What type of trip is this?' },
  { step: 5, title: 'Activities', description: 'Any specific activities planned?' },
  { step: 6, title: 'Special Needs', description: 'Any special needs or considerations? (optional)' },
];

const SmartPlanningPage: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    destination: '',
    dates: { start: '', end: '' },
    gender: '',
    tripType: '',
    activities: [] as string[],
    specialNeeds: '',
  });

  // Handlers for navigation
  const goNext = () => {
    if (currentStep < steps.length) setCurrentStep((s) => s + 1);
  };
  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  // Handler for input change (Destination step for now)
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, destination: e.target.value }));
  };

  // Validation for required steps
  const isNextDisabled = () => {
    if (currentStep === 1) return !answers.destination.trim();
    // Other steps will be validated as implemented
    return false;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left: Blue panel with stepper */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col items-center justify-center p-0 text-white">
        <div className="flex flex-col justify-center h-full w-full max-w-sm px-10 py-16">
          {/* Section header */}
          <h2 className="text-3xl font-bold font-serif mb-10">Smart Planning</h2>
          {/* Stepper */}
          <Stepper value={currentStep} orientation="vertical" className="gap-0">
            {steps.map(({ step, title, description }) => (
              <StepperItem key={step} step={step}>
                <div className="flex items-start w-full">
                  <StepperIndicator
                    className={`mr-4 mt-0.5
                      ${currentStep === step ? 'bg-black text-white border-black' : 'bg-transparent text-blue-200 border border-blue-200'}
                      ${currentStep > step ? 'bg-blue-600 text-white border-blue-600' : ''}
                      w-7 h-7 flex items-center justify-center text-base font-bold transition-all`}
                  />
                  <div className="flex flex-col text-left">
                    <StepperTitle className={`text-base ${currentStep === step ? 'font-bold text-white' : 'font-medium text-blue-100'}`}>{title}</StepperTitle>
                    <StepperDescription className={`text-xs ${currentStep === step ? 'text-blue-100' : 'text-blue-200'}`}>{description}</StepperDescription>
                  </div>
                </div>
                {step < steps.length && (
                  <StepperSeparator className="ml-3 h-6 w-0.5 bg-blue-200 opacity-60 self-start" />
                )}
              </StepperItem>
            ))}
          </Stepper>
          {/* Description */}
          <div className="mt-20">
            <h2 className="font-serif text-xl font-bold mb-2">Plan your trip</h2>
            <p className="text-base opacity-90">
              Answer a few quick questions to get a personalized, AI-powered packing list.
            </p>
          </div>
        </div>
      </div>
      {/* Right: Flat questionnaire area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-lg mx-auto py-12 flex flex-col items-start">
          <h1 className="font-serif text-3xl font-bold text-blue-900 mb-2">{steps[currentStep - 1].title}</h1>
          <p className="text-muted-foreground mb-10 text-base">{steps[currentStep - 1].description}</p>
          {/* Render question for current step */}
          {currentStep === 1 && (
            <input
              type="text"
              className="w-full border border-gray-200 rounded-md px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              placeholder="Enter your destination"
              value={answers.destination}
              onChange={handleDestinationChange}
              autoFocus
            />
          )}
          {/* TODO: Add UI for other steps */}
          <div className="flex justify-between w-full mt-8">
            <Button variant="ghost" onClick={goPrev} disabled={currentStep === 1}>
              Previous Step
            </Button>
            <Button onClick={goNext} disabled={isNextDisabled()}>
              {currentStep === steps.length ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPlanningPage; 