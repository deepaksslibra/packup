'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';

/**
 * Onboarding page for the AI-Powered Packing Checklist app (PackUp).
 * Presents options for Smart Planning (questionnaire) or Predefined Templates.
 * @returns {JSX.Element} The onboarding screen component.
 */
const OnboardingPage: FC = () => {
  const router = useRouter();
  const markOnboardingComplete = useOnboardingStore((state) => state.markOnboardingComplete);
  
  const handleNavigation = (path: string) => {
    markOnboardingComplete();
    router.push(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left panel */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8 text-white">
        <div className="flex flex-col gap-6 max-w-xs w-full">
          <div className="flex items-center gap-2">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              {/* Suitcase/travel icon placeholder */}
              <span className="text-2xl font-bold" aria-label="Suitcase" role="img">
                🧳
              </span>
            </div>
            <span className="font-semibold text-lg tracking-wide">PackUp</span>
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight">
            Create a smart packing list for your trip!
          </h1>
          <p className="text-base opacity-90">
            Personalized, AI-powered packing lists in seconds. No signup needed.
          </p>
          <p className="text-sm opacity-80 mt-2">
            Save time, pack smarter, and travel stress-free with tailored recommendations for every
            journey.
          </p>
        </div>
      </div>
      {/* Right panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2 text-gray-800">
            How would you like to start?
          </h2>
          <p className="text-gray-500 mb-6">
            Answer a few quick questions for a personalized list, or pick a ready-made template.
          </p>
          <div className="flex flex-col gap-4">
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
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-2">
                    {/* Smart Planning icon */}
                    <span className="text-lg" aria-label="Chat" role="img">
                      💬
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900">Smart Planning</div>
                    <div className="text-xs text-blue-800 opacity-80">
                      Answer a few questions for a tailored packing list
                    </div>
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M7 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                    {/* Template icon */}
                    <span className="text-lg" aria-label="Template" role="img">
                      📋
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Predefined Templates</div>
                    <div className="text-xs text-gray-600 opacity-80">
                      Choose from popular trip types and customize
                    </div>
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M7 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
