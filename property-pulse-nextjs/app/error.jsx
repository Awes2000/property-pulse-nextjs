'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const ErrorPage = ({ error, reset }) => {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <section className="bg-blue-50 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Something Went Wrong
                </h2>
                <p className="text-gray-600 mb-6">
                    {error?.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;