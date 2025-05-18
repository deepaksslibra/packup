'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts';

interface Place {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Secure implementation of Places Autocomplete that uses a server-side API route
 * to protect the Google API key
 */
export default function PlacesAutocomplete({
  value,
  onChange,
  className,
}: PlacesAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedInputValue] = useDebounceValue(inputValue, 300);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch place suggestions from our API route
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedInputValue.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/places?input=${encodeURIComponent(debouncedInputValue)}`
        );
        const data = await response.json();
        
        if (data.predictions) {
          setSuggestions(data.predictions);
        }
      } catch (error) {
        console.error('Error fetching place suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedInputValue]);

  // Fetch place details when a suggestion is selected
  const handleSelectPlace = async (placeId: string, description: string) => {
    try {
      setInputValue(description);
      onChange(description);
      setShowSuggestions(false);
      
      // Fetch additional place details if needed
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId }),
      });
      
      const data = await response.json();
      
      if (data.result && data.result.formatted_address) {
        setInputValue(data.result.formatted_address);
        onChange(data.result.formatted_address);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        className={className || "w-full border border-gray-200 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary bg-white"}
        placeholder="Enter your destination"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        autoFocus
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPlace(suggestion.place_id, suggestion.description)}
            >
              <div className="font-medium">{suggestion.structured_formatting.main_text}</div>
              <div className="text-sm text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
            </li>
          ))}
        </ul>
      )}
      
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
} 