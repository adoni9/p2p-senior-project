import React, { useState } from 'react';

const LoadingButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      // Replace the URL with your actual backend endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error('Error:', error); // Handle error as needed
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg 
                  ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} 
                  transition-colors duration-300`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v10l6 6" />
          </svg>
          Loading...
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
};

export default LoadingButton;
