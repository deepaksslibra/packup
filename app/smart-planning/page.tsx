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
  { step: 1, title: 'Trip Basics', description: 'Where and when are you traveling?' },
  { step: 2, title: 'About You', description: 'Tell us about yourself and your trip.' },
  { step: 3, title: 'Activities', description: 'Any specific activities planned?' },
  { step: 4, title: 'Special Needs', description: 'Any special needs or considerations? (optional)' },
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
  const [customActivity, setCustomActivity] = useState('');

  // Handlers for navigation
  const goNext = () => {
    if (currentStep < steps.length) setCurrentStep((s) => s + 1);
  };
  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  // Handlers for input changes
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, destination: e.target.value }));
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, dates: { ...prev.dates, [name]: value } }));
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, gender: e.target.value }));
  };
  const handleTripTypeChange = (type: string) => {
    setAnswers((prev) => ({ ...prev, tripType: type }));
  };

  // Activity options with icons
  const activityOptions = [
    { label: 'Sightseeing', value: 'Sightseeing', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#2563eb" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#2563eb" strokeWidth="2"/></svg>
    ) },
    { label: 'Hiking', value: 'Hiking', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M6 21l6-6 6 6" stroke="#16a34a" strokeWidth="2"/><path d="M12 3v12" stroke="#16a34a" strokeWidth="2"/></svg>
    ) },
    { label: 'Swimming/Beach', value: 'Swimming/Beach', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" stroke="#0ea5e9" strokeWidth="2"/><circle cx="12" cy="8" r="3" stroke="#0ea5e9" strokeWidth="2"/></svg>
    ) },
    { label: 'Sports', value: 'Sports', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="#f59e42" strokeWidth="2"/><path d="M4 12h16M12 4v16" stroke="#f59e42" strokeWidth="2"/></svg>
    ) },
    { label: 'Nightlife', value: 'Nightlife', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#a21caf" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="#a21caf" strokeWidth="2"/></svg>
    ) },
    { label: 'Other', value: 'Other', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#64748b" strokeWidth="2"/></svg>
    ) },
  ];

  const handleActivityToggle = (value: string) => {
    setAnswers((prev) => {
      const exists = prev.activities.includes(value);
      let newActivities = exists
        ? prev.activities.filter((a) => a !== value)
        : [...prev.activities, value];
      // If unselecting 'Other', clear customActivity
      if (value === 'Other' && exists) setCustomActivity('');
      return {
        ...prev,
        activities: newActivities,
      };
    });
  };

  const handleCustomActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomActivity(e.target.value);
  };

  const handleSpecialNeedsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => ({ ...prev, specialNeeds: e.target.value }));
  };

  // Validation for required steps
  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !answers.destination.trim() || !answers.dates.start || !answers.dates.end;
    }
    if (currentStep === 2) {
      return !answers.gender || !answers.tripType;
    }
    if (currentStep === 3) {
      const hasOther = answers.activities.includes('Other');
      if (hasOther) {
        return answers.activities.length === 0 || !customActivity.trim();
      }
      return answers.activities.length === 0;
    }
    // Other steps will be validated as implemented
    return false;
  };

  // Gender and trip type icons
  const genderOptions = [
    { label: 'Male', value: 'Male', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" stroke="#2563eb" strokeWidth="2"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" stroke="#2563eb" strokeWidth="2"/></svg>
    ) },
    { label: 'Female', value: 'Female', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" stroke="#d946ef" strokeWidth="2"/><path d="M12 14v6M9 20h6" stroke="#d946ef" strokeWidth="2"/></svg>
    ) },
    { label: 'Prefer not to say', value: 'Prefer not to say', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="10" r="4" stroke="#64748b" strokeWidth="2"/><path d="M6 20h12" stroke="#64748b" strokeWidth="2"/></svg>
    ) },
  ];
  const tripTypeOptions = [
    { label: 'Vacation/Leisure', value: 'Vacation/Leisure', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 17h18M4 17V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10" stroke="#2563eb" strokeWidth="2"/><circle cx="8" cy="21" r="1" fill="#2563eb"/><circle cx="16" cy="21" r="1" fill="#2563eb"/></svg>
    ) },
    { label: 'Business', value: 'Business', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" stroke="#0ea5e9" strokeWidth="2"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="#0ea5e9" strokeWidth="2"/></svg>
    ) },
    { label: 'Adventure/Outdoor', value: 'Adventure/Outdoor', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 21l9-18 9 18H3z" stroke="#16a34a" strokeWidth="2"/><circle cx="12" cy="17" r="1" fill="#16a34a"/></svg>
    ) },
    { label: 'Other', value: 'Other', icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#64748b" strokeWidth="2"/></svg>
    ) },
  ];

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
        <div className="w-full max-w-lg mx-auto py-12 flex flex-col items-start min-h-[600px] relative">
          <h1 className="font-serif text-3xl font-bold text-blue-900 mb-2">{steps[currentStep - 1].title}</h1>
          <p className="text-muted-foreground mb-10 text-base">{steps[currentStep - 1].description}</p>
          {/* Render question for current step */}
          {currentStep === 1 && (
            <>
              <label className="block text-sm font-medium mb-1" htmlFor="destination">Destination</label>
              <input
                id="destination"
                type="text"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="Enter your destination"
                value={answers.destination}
                onChange={handleDestinationChange}
                autoFocus
              />
              <div className="flex gap-4 w-full mb-8">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="date-start">Start Date</label>
                  <input
                    id="date-start"
                    name="start"
                    type="date"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    value={answers.dates.start}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="date-end">End Date</label>
                  <input
                    id="date-end"
                    name="end"
                    type="date"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    value={answers.dates.end}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="mb-8 w-full">
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="flex gap-4">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleGenderChange({ target: { value: option.value } } as any)}
                      className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-colors w-32 h-32 focus:outline-none
                        ${answers.gender === option.value ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                      aria-pressed={answers.gender === option.value}
                    >
                      {option.icon}
                      <span className="mt-2 text-sm font-medium text-gray-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8 w-full">
                <label className="block text-sm font-medium mb-2">Trip Type</label>
                <div className="flex gap-4 flex-wrap">
                  {tripTypeOptions.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleTripTypeChange(type.value)}
                      className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-colors w-40 h-32 focus:outline-none
                        ${answers.tripType === type.value ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                      aria-pressed={answers.tripType === type.value}
                    >
                      {type.icon}
                      <span className="mt-2 text-sm font-medium text-gray-900">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="mb-8 w-full">
                <label className="block text-sm font-medium mb-2">Select your activities</label>
                <div className="flex gap-4 flex-wrap">
                  {activityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleActivityToggle(option.value)}
                      className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-colors w-40 h-32 focus:outline-none
                        ${answers.activities.includes(option.value) ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                      aria-pressed={answers.activities.includes(option.value)}
                    >
                      {option.icon}
                      <span className="mt-2 text-sm font-medium text-gray-900">{option.label}</span>
                    </button>
                  ))}
                </div>
                {answers.activities.includes('Other') && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-1" htmlFor="custom-activity">Please specify</label>
                    <input
                      id="custom-activity"
                      type="text"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="Enter your activity"
                      value={customActivity}
                      onChange={handleCustomActivityChange}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {currentStep === 4 && (
            <>
              <div className="mb-8 w-full">
                <label className="block text-sm font-medium mb-2" htmlFor="special-needs">Special Needs or Considerations (optional)</label>
                <textarea
                  id="special-needs"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="Let us know about any medical, dietary, accessibility, or other needs."
                  value={answers.specialNeeds}
                  onChange={handleSpecialNeedsChange}
                />
              </div>
            </>
          )}
          <div className="flex justify-between w-full mt-auto absolute left-0 bottom-0 px-0 pb-0">
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