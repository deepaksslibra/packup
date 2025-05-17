'use client';
import { useEffect, type FC } from 'react';

/**
 * Error boundary UI for Smart Planning Questionnaire page.
 * Shown if an error occurs during rendering or data fetching.
 * @param {object} props
 * @param {Error} props.error - The error object
 * @param {() => void} props.reset - Function to reset/retry the error boundary
 * @returns {JSX.Element}
 */
type ErrorProps = { error: Error; reset: () => void };

const Error: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Optionally log error
    // console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
        <p className="text-gray-700 mb-4 text-center">
          We couldn&apos;t load the Smart Planning questionnaire.
          <br />
          Please try again.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    </main>
  );
};

export default Error;
