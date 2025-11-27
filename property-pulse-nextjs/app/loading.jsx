'use client';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;