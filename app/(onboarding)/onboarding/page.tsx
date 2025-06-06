'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { FC } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useTripStore } from '@/store/tripStore';
import { useStepStore } from '@/store/stepStore';
import { Backpack, ChatCircleText, ClipboardText, CaretRight } from '@phosphor-icons/react';

/**
 * Onboarding page for the AI-Powered Packing Checklist app (PackUp).
 * Presents options for Smart Planning (questionnaire) or Predefined Templates.
 * @returns {JSX.Element} The onboarding screen component.
 */
const OnboardingPage: FC = () => {
  const router = useRouter();
  const markOnboardingComplete = useOnboardingStore((state) => state.markOnboardingComplete);
  const trips = useTripStore((state) => state.trips);
  const reset = useStepStore((state) => state.reset);
  const hasSavedTrips = trips.length > 0;

  // Reset stepper state when landing on the onboarding page
  useEffect(() => {
    reset();
  }, [reset]);

  const handleNavigation = (path: string) => {
    markOnboardingComplete();
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left panel */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col py-8 px-5 md:p-8 text-white md:items-center md:justify-center">
        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-xs">
          <div className="flex items-center gap-2">
            {/* Backpack icon */}
            <Backpack size={24} weight="fill" aria-label="Backpack" className="text-white" />
            <span className="font-semibold text-lg tracking-wide">PackUp</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
            Create a smart packing list for your trip!
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Personalized, AI-powered packing lists in seconds. No signup needed.
          </p>
          <p className="text-xs md:text-sm opacity-80 mt-2 hidden md:block">
            Save time, pack smarter, and travel stress-free with tailored recommendations for every
            journey.
          </p>
        </div>
      </div>
      {/* Right panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-5 md:p-8 md:items-center">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4" />
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-2 text-gray-800">
            How would you like to start?
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
            Answer a few quick questions for a personalized list, or pick a ready-made template.
          </p>
          <div className="flex flex-col gap-3 md:gap-4">
            <Card
              className="border-2 border-blue-600 bg-blue-50 cursor-pointer transition hover:shadow-lg hover:bg-blue-100"
              onClick={() => handleNavigation('/smart-planning')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigation('/smart-planning');
                }
              }}
            >
              <CardContent className="flex items-center justify-between p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-2">
                    {/* Smart Planning icon */}
                    <ChatCircleText
                      size={20}
                      weight="fill"
                      aria-label="Chat"
                      className="md:w-6 md:h-6"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 text-sm md:text-base">
                      Smart Planning
                    </div>
                    <div className="text-xs text-blue-800 opacity-80">
                      Answer a few questions for a tailored packing list
                    </div>
                  </div>
                </div>
                <div className="text-blue-600">
                  <CaretRight size={20} weight="bold" />
                </div>
              </CardContent>
            </Card>
            <Card
              className="border bg-white cursor-pointer transition hover:shadow-lg hover:bg-gray-50"
              onClick={() => handleNavigation('/templates')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigation('/templates');
                }
              }}
            >
              <CardContent className="flex items-center justify-between p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    {/* Template icon */}
                    <ClipboardText
                      size={20}
                      weight="fill"
                      aria-label="Template"
                      className="md:w-6 md:h-6"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm md:text-base">
                      Predefined Templates
                    </div>
                    <div className="text-xs text-gray-600 opacity-80">
                      Choose from popular trip types and customize
                    </div>
                  </div>
                </div>
                <div className="text-blue-600">
                  <CaretRight size={20} weight="bold" />
                </div>
              </CardContent>
            </Card>
          </div>

          {hasSavedTrips && (
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/trips')}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Go back to your saved trips
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
