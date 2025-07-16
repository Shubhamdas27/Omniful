import React, { useState, useEffect, useRef } from 'react';
import './AutoComplete.css';

interface AutoCompleteProps {
  suggestions: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  maxSuggestions?: number;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  suggestions,
  placeholder = 'Type to search...',
  onSelect,
  onChange,
  maxSuggestions = 10
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // ARIA constants for strict linters

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions
        .filter(suggestion =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, maxSuggestions);
      
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions, maxSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    onSelect?.(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestionIndex]);
        }
        break;
      
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    }, 100);
  };

  return (
    <div className="autocomplete" onBlur={handleBlur}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="autocomplete-input"
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
        aria-controls="autocomplete-suggestions"
        aria-label="Search suggestions"
        role="combobox"
      />
      
      {showSuggestions && (
        <ul
          ref={suggestionsRef}
          className="autocomplete-suggestions"
          id="autocomplete-suggestions"
          role="listbox"
        >
          {filteredSuggestions.map((suggestion, index) => {
            const isSelected = index === activeSuggestionIndex;
            return (
              <li
                key={suggestion}
                className={`autocomplete-suggestion ${
                  isSelected ? 'active' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={isSelected}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
