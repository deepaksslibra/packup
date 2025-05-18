'use client';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useStepStore } from '@/store/stepStore';
import { useTripStore } from '@/store/tripStore';
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
import {
  Binoculars,
  Mountains,
  FigmaLogo,
  Barbell,
  Moon,
  Package,
  Suitcase,
  SuitcaseRolling,
  SuitcaseSimple,
  Backpack,
  Briefcase,
  TShirt,
  User,
  Tent,
  Question,
  Compass,
  CaretDown,
  CaretUp,
  ArrowLeft,
} from '@phosphor-icons/react';
import PlacesAutocomplete from './_components/PlacesAutocomplete';

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
  { step: 4, title: 'Luggage', description: 'What luggage will you carry?' },
  {
    step: 5,
    title: 'Special Needs',
    description: 'Any special needs or considerations? (optional)',
  },
];

const SmartPlanningPage: FC = () => {
  const router = useRouter();
  const currentStep = useStepStore((state) => state.currentStep);
  const answers = useStepStore((state) => state.answers);
  const setStep = useStepStore((state) => state.setStep);
  const setAnswers = useStepStore((state) => state.setAnswers);
  const reset = useStepStore((state) => state.reset);
  const addTrip = useTripStore((state) => state.addTrip);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showStepperOnMobile, setShowStepperOnMobile] = useState(false);

  // For the mobile stepper indicator
  useEffect(() => {
    // Close the mobile stepper when changing steps
    setShowStepperOnMobile(false);
  }, [currentStep]);

  // Handlers for navigation
  const goNext = async () => {
    if (currentStep < steps.length) {
      setStep(currentStep + 1);
    }
  };
  const goPrev = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  // Handler for saving the trip
  const saveTrip = async () => {
    // Show loading state in the button
    setIsFinishing(true);

    // Create a trip from the answers
    const tripId = uuidv4();

    // Format trip details for the AI
    const tripDetails = {
      destination: answers.destination,
      startDate: answers.dates.start,
      endDate: answers.dates.end,
      tripPurpose: answers.tripType,
      activities: [
        ...answers.activities,
        ...(answers.customActivity ? [answers.customActivity] : []),
      ],
      accommodation: 'Not specified', // Could add this to the questionnaire
      transportation: 'Not specified', // Could add this to the questionnaire
      travelParty: [answers.gender],
      additionalInfo: answers.specialNeeds,
      luggageConstraints: {
        maxTotalWeight: Number(answers.luggageWeight) || 5, // Convert to number or default to 5kg
        luggageType: answers.luggageType, // Array of selected luggage types
        weightDistribution: `Weight limit: ${answers.luggageWeight}kg across ${answers.luggageType.join(', ')}`,
      },
    };

    // Create initial trip object
    const newTrip = {
      id: tripId,
      name: `Trip to ${answers.destination}`,
      createdAt: new Date().toISOString(),
      location: answers.destination,
      startDate: answers.dates.start,
      endDate: answers.dates.end,
      items: [], // Will be populated by AI recommendations
      isLoadingItems: true, // Flag to indicate items are being loaded
      aiTripDetails: tripDetails, // Store the trip details for AI processing
    };

    // Add trip to store
    addTrip(newTrip);

    // Navigate to the edit screen immediately
    router.push(`/trip/${tripId}/edit`);
  };

  // Handlers for input changes
  const handleDestinationChange = (value: string) => {
    setAnswers({ destination: value });
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers({ dates: { ...answers.dates, [name]: value } });
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ gender: e.target.value });
  };
  const handleTripTypeChange = (type: string) => {
    setAnswers({ tripType: type });
  };
  const handleLuggageTypeChange = (type: string) => {
    const exists = answers.luggageType.includes(type);
    const newLuggageTypes = exists
      ? answers.luggageType.filter((t) => t !== type)
      : [...answers.luggageType, type];
    setAnswers({ luggageType: newLuggageTypes });
  };
  const handleLuggageWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ luggageWeight: e.target.value });
  };

  // Activity options with icons
  const activityOptions = [
    {
      label: 'Sightseeing',
      value: 'Sightseeing',
      icon: <Binoculars size={32} weight="duotone" color="#2563eb" />,
    },
    {
      label: 'Hiking',
      value: 'Hiking',
      icon: <Mountains size={32} weight="duotone" color="#16a34a" />,
    },
    {
      label: 'Swimming/Beach',
      value: 'Swimming/Beach',
      icon: <FigmaLogo size={32} weight="duotone" color="#0ea5e9" />,
    },
    {
      label: 'Sports',
      value: 'Sports',
      icon: <Barbell size={32} weight="duotone" color="#f59e42" />,
    },
    {
      label: 'Nightlife',
      value: 'Nightlife',
      icon: <Moon size={32} weight="duotone" color="#a21caf" />,
    },
    {
      label: 'Other',
      value: 'Other',
      icon: <Question size={32} weight="duotone" color="#64748b" />,
    },
  ];

  const handleActivityToggle = (value: string) => {
    const exists = answers.activities.includes(value);
    const newActivities = exists
      ? answers.activities.filter((a) => a !== value)
      : [...answers.activities, value];
    // If unselecting 'Other', clear customActivity
    setAnswers({
      activities: newActivities,
      ...(value === 'Other' && exists ? { customActivity: '' } : {}),
    });
  };

  const handleCustomActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ customActivity: e.target.value });
  };

  const handleSpecialNeedsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({ specialNeeds: e.target.value });
  };

  // Luggage type options with icons
  const luggageOptions = [
    {
      label: 'Backpack (Carry-on)',
      value: 'Backpack',
      icon: <Backpack size={32} weight="duotone" color="#0ea5e9" />,
    },
    {
      label: 'Small Cabin Luggage',
      value: 'Small Cabin Luggage',
      icon: <SuitcaseSimple size={32} weight="duotone" color="#2563eb" />,
    },
    {
      label: 'Medium Check-in Luggage',
      value: 'Medium Check-in Luggage',
      icon: <Suitcase size={32} weight="duotone" color="#16a34a" />,
    },
    {
      label: 'Large Check-in Luggage',
      value: 'Large Check-in Luggage',
      icon: <SuitcaseRolling size={32} weight="duotone" color="#dc2626" />,
    },
  ];

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
        return answers.activities.length === 0 || !answers.customActivity.trim();
      }
      return answers.activities.length === 0;
    }
    if (currentStep === 4) {
      return answers.luggageType.length === 0 || !answers.luggageWeight.trim();
    }
    // Other steps will be validated as implemented
    return false;
  };

  // Gender and trip type icons
  const genderOptions = [
    {
      label: 'Male',
      value: 'Male',
      icon: <User size={32} weight="duotone" color="#2563eb" />,
    },
    {
      label: 'Female',
      value: 'Female',
      icon: <User size={32} weight="duotone" color="#d946ef" />,
    },
    {
      label: 'Prefer not to say',
      value: 'Prefer not to say',
      icon: <User size={32} weight="duotone" color="#64748b" />,
    },
  ];
  const tripTypeOptions = [
    {
      label: 'Vacation/Leisure',
      value: 'Vacation/Leisure',
      icon: <Package size={32} weight="duotone" color="#2563eb" />,
    },
    {
      label: 'Business',
      value: 'Business',
      icon: <Briefcase size={32} weight="duotone" color="#0ea5e9" />,
    },
    {
      label: 'Adventure/Outdoor',
      value: 'Adventure/Outdoor',
      icon: <Tent size={32} weight="duotone" color="#16a34a" />,
    },
    {
      label: 'Other',
      value: 'Other',
      icon: <Compass size={32} weight="duotone" color="#64748b" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile header - collapses to show step number and title */}
      <div className="md:hidden bg-blue-600 text-white">
        <div className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/onboarding')}
              className="text-white hover:bg-blue-700"
              aria-label="Go back to home"
            >
              <ArrowLeft size={24} weight="bold" />
            </Button>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowStepperOnMobile(!showStepperOnMobile)}
            >
              <div className="bg-white text-blue-600 w-7 h-7 rounded-full flex items-center justify-center mr-2 font-semibold">
                {currentStep}
              </div>
              {showStepperOnMobile ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </div>
          </div>

          <h2 className="text-xl font-bold font-serif">Smart Planning</h2>

          {/* Mobile step title and description */}
          <div className="mt-2">
            <h3 className="font-bold">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-blue-100">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Mobile Stepper - collapsible */}
        {showStepperOnMobile && (
          <div className="p-4 pb-6 pt-0 mt-2">
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
                      <StepperTitle
                        className={`text-base ${currentStep === step ? 'font-bold text-white' : 'font-medium text-blue-100'}`}
                      >
                        {title}
                      </StepperTitle>
                      <StepperDescription
                        className={`text-xs ${currentStep === step ? 'text-blue-100' : 'text-blue-200'}`}
                      >
                        {description}
                      </StepperDescription>
                    </div>
                  </div>
                  {step < steps.length && (
                    <StepperSeparator className="ml-3 h-6 w-0.5 bg-blue-200 opacity-60 self-start" />
                  )}
                </StepperItem>
              ))}
            </Stepper>

            <div className="mt-4">
              <p className="text-sm opacity-90">
                Answer a few quick questions to get a personalized, AI-powered packing list.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Left: Blue panel with stepper (desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 flex-col items-center justify-center p-0 text-white">
        <div className="flex flex-col justify-center h-full w-full max-w-sm px-10 py-16">
          {/* Back button and section header */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/onboarding')}
            className="text-white hover:bg-blue-700 self-start mb-4"
            aria-label="Go back to home"
          >
            <ArrowLeft size={24} weight="bold" />
          </Button>
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
                    <StepperTitle
                      className={`text-base ${currentStep === step ? 'font-bold text-white' : 'font-medium text-blue-100'}`}
                    >
                      {title}
                    </StepperTitle>
                    <StepperDescription
                      className={`text-xs ${currentStep === step ? 'text-blue-100' : 'text-blue-200'}`}
                    >
                      {description}
                    </StepperDescription>
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

      {/* Right: Flat questionnaire area - now responsive*/}
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-start md:justify-center items-center p-4 md:p-8 bg-gray-50">
        <div className="w-full max-w-lg mx-auto py-4 md:py-12 flex flex-col items-start min-h-[350px] md:min-h-[600px] relative">
          {/* Hide heading on mobile as it's already in the header */}
          <div className="hidden md:block">
            <h1 className="font-serif text-3xl font-bold text-blue-900 mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-muted-foreground mb-10 text-base">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {/* Render question for current step */}
          <div className="w-full">
            {currentStep === 1 && (
              <>
                <label className="block text-sm font-medium mb-1" htmlFor="destination">
                  Destination
                </label>
                <PlacesAutocomplete
                  value={answers.destination}
                  onChange={handleDestinationChange}
                />
                <div className="flex flex-col sm:flex-row gap-4 w-full mb-8 mt-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1" htmlFor="date-start">
                      Start Date
                    </label>
                    <input
                      id="date-start"
                      name="start"
                      type="date"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base"
                      value={answers.dates.start}
                      onChange={handleDateChange}
                      min={
                        new Date().toISOString().split('T')[0]
                      } /* Today's date in YYYY-MM-DD format */
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1" htmlFor="date-end">
                      End Date
                    </label>
                    <input
                      id="date-end"
                      name="end"
                      type="date"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base"
                      value={answers.dates.end}
                      onChange={handleDateChange}
                      min={
                        answers.dates.start || new Date().toISOString().split('T')[0]
                      } /* Must be on or after start date */
                    />
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="mb-8 w-full">
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {genderOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          handleGenderChange({
                            target: { value: option.value },
                          } as React.ChangeEvent<HTMLInputElement>)
                        }
                        className={`flex flex-col items-center justify-center px-2 md:px-4 py-2 md:py-3 rounded-xl border transition-colors w-[98px] md:w-32 h-[98px] md:h-32 focus:outline-none
                          ${answers.gender === option.value ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                        aria-pressed={answers.gender === option.value}
                      >
                        {option.icon}
                        <span className="mt-2 text-xs md:text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8 w-full">
                  <label className="block text-sm font-medium mb-2">Trip Type</label>
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    {tripTypeOptions.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleTripTypeChange(type.value)}
                        className={`flex flex-col items-center justify-center px-2 md:px-4 py-2 md:py-3 rounded-xl border transition-colors w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-40 h-[98px] md:h-32 focus:outline-none
                          ${answers.tripType === type.value ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                        aria-pressed={answers.tripType === type.value}
                      >
                        {type.icon}
                        <span className="mt-2 text-xs md:text-sm font-medium text-gray-900">
                          {type.label}
                        </span>
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
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    {activityOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleActivityToggle(option.value)}
                        className={`flex flex-col items-center justify-center px-2 md:px-4 py-2 md:py-3 rounded-xl border transition-colors w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-40 h-[98px] md:h-32 focus:outline-none
                          ${answers.activities.includes(option.value) ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                        aria-pressed={answers.activities.includes(option.value)}
                      >
                        {option.icon}
                        <span className="mt-2 text-xs md:text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {answers.activities.includes('Other') && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="custom-activity">
                        Please specify
                      </label>
                      <input
                        id="custom-activity"
                        type="text"
                        className="w-full border border-gray-200 rounded-md px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base"
                        placeholder="Enter your activity"
                        value={answers.customActivity}
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
                  <label className="block text-sm font-medium mb-2">Select Luggage Type(s)</label>
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    {luggageOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleLuggageTypeChange(option.value)}
                        className={`flex flex-col items-center justify-center px-2 md:px-4 py-2 md:py-3 rounded-xl border transition-colors w-[calc(50%-8px)] sm:w-[calc(50%-12px)] md:w-40 h-[98px] md:h-32 focus:outline-none
                          ${answers.luggageType.includes(option.value) ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                        aria-pressed={answers.luggageType.includes(option.value)}
                      >
                        {option.icon}
                        <span className="mt-2 text-xs md:text-sm font-medium text-gray-900 text-center">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8 w-full">
                  <label className="block text-sm font-medium mb-2" htmlFor="luggage-weight">
                    Approximate Weight (kg)
                  </label>
                  <input
                    id="luggage-weight"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full max-w-[200px] border border-gray-200 rounded-md px-3 py-2 h-11 focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base"
                    placeholder="e.g., 15"
                    value={answers.luggageWeight}
                    onChange={handleLuggageWeightChange}
                  />
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <div className="mb-8 w-full">
                  <label className="block text-sm font-medium mb-2" htmlFor="special-needs">
                    Special Needs or Considerations (optional)
                  </label>
                  <textarea
                    id="special-needs"
                    className="w-full border border-gray-200 rounded-md px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base"
                    placeholder="Let us know about any medical, dietary, accessibility, or other needs."
                    value={answers.specialNeeds}
                    onChange={handleSpecialNeedsChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* Navigation buttons - always at bottom of form container */}
          <div className="flex justify-between w-full mt-auto pt-6 md:pt-8">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={goPrev}
                disabled={isFinishing}
                className="h-11 px-4 min-w-[100px]"
              >
                Previous
              </Button>
            )}
            {currentStep === 1 && <div />}{' '}
            {/* Empty div to maintain layout when button is hidden */}
            <Button
              onClick={currentStep === steps.length ? saveTrip : goNext}
              disabled={isNextDisabled() || isFinishing}
              className={`h-11 px-6 min-w-[100px] ${isFinishing ? 'opacity-80' : ''}`}
            >
              {isFinishing ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : currentStep === steps.length ? (
                'Save Trip'
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPlanningPage;
