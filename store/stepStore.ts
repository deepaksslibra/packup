import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * State for the Smart Planning questionnaire.
 */
export interface QuestionnaireAnswers {
  destination: string;
  dates: { start: string; end: string };
  gender: string;
  tripType: string;
  activities: string[];
  specialNeeds: string;
  customActivity: string;
  luggageType: string[];
  luggageWeight: string;
}

export interface StepStoreState {
  currentStep: number;
  answers: QuestionnaireAnswers;
  setStep: (step: number) => void;
  setAnswers: (answers: Partial<QuestionnaireAnswers>) => void;
  reset: () => void;
}

const initialAnswers: QuestionnaireAnswers = {
  destination: '',
  dates: { start: '', end: '' },
  gender: '',
  tripType: '',
  activities: [],
  specialNeeds: '',
  customActivity: '',
  luggageType: [],
  luggageWeight: '',
};

/**
 * Zustand store for Smart Planning step and answers, persisted in localStorage.
 * @returns {StepStoreState} Store state and actions.
 */
export const useStepStore = create<StepStoreState>()(
  persist(
    (set) => ({
      currentStep: 1,
      answers: initialAnswers,
      setStep: (step) => set({ currentStep: step }),
      setAnswers: (answers) =>
        set((state) => ({
          answers: { ...state.answers, ...answers },
        })),
      reset: () => set({ currentStep: 1, answers: initialAnswers }),
    }),
    {
      name: 'smart-planning-step-store',
    }
  )
);
