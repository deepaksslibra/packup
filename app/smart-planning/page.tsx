'use client';
import type { FC } from 'react';
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
  Compass
} from '@phosphor-icons/react';

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

  // Handlers for navigation
  const goNext = () => {
    if (currentStep < steps.length) {
      setStep(currentStep + 1);
    } else {
      // Last step completed, create a trip from the answers
      const newTrip = {
        id: uuidv4(),
        name: `Trip to ${answers.destination}`,
        createdAt: new Date().toISOString(),
        location: answers.destination,
        startDate: answers.dates.start,
        endDate: answers.dates.end,
        items: [], // Will be populated later with AI recommendations
      };

      addTrip(newTrip);
      reset(); // Reset the questionnaire
      router.push(`/trip/${newTrip.id}/edit`);
    }
  };
  const goPrev = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  // Handlers for input changes
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ destination: e.target.value });
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
      {/* Right: Flat questionnaire area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-lg mx-auto py-12 flex flex-col items-start min-h-[600px] relative">
          <h1 className="font-serif text-3xl font-bold text-blue-900 mb-2">
            {steps[currentStep - 1].title}
          </h1>
          <p className="text-muted-foreground mb-10 text-base">
            {steps[currentStep - 1].description}
          </p>
          {/* Render question for current step */}
          {currentStep === 1 && (
            <>
              <label className="block text-sm font-medium mb-1" htmlFor="destination">
                Destination
              </label>
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
                  <label className="block text-sm font-medium mb-1" htmlFor="date-start">
                    Start Date
                  </label>
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
                  <label className="block text-sm font-medium mb-1" htmlFor="date-end">
                    End Date
                  </label>
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
                      onClick={() =>
                        handleGenderChange({
                          target: { value: option.value },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
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
                    <label className="block text-sm font-medium mb-1" htmlFor="custom-activity">
                      Please specify
                    </label>
                    <input
                      id="custom-activity"
                      type="text"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
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
                <div className="flex gap-4 flex-wrap">
                  {luggageOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleLuggageTypeChange(option.value)}
                      className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border transition-colors w-40 h-32 focus:outline-none
                        ${answers.luggageType.includes(option.value) ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:bg-blue-50'}`}
                      aria-pressed={answers.luggageType.includes(option.value)}
                    >
                      {option.icon}
                      <span className="mt-2 text-sm font-medium text-gray-900">{option.label}</span>
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
                  className="w-full max-w-[200px] border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
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
