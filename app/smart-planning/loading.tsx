/**
 * Loading UI for Smart Planning Questionnaire page.
 * Shown while the page or data is loading.
 */
const Loading = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4" />
      <span className="text-blue-700 font-medium">Loading Smart Planning...</span>
    </div>
  </main>
);

export default Loading;
