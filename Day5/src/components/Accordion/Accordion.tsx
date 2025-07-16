import React, { useState } from 'react';
import './Accordion.css';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = []
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  // ARIA constants for strict linters
  const ARIA_TRUE = "true" as const;
  const ARIA_FALSE = "false" as const;

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }
      
      return newOpenItems;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(itemId);
    }
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const ariaExpanded = isOpen ? ARIA_TRUE : ARIA_FALSE;
        
        return (
          <div key={item.id} className="accordion-item">
            <button
              className={`accordion-header ${isOpen ? 'active' : ''}`}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-expanded={ariaExpanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="accordion-title">{item.title}</span>
              <span className={`accordion-icon ${isOpen ? 'rotated' : ''}`}>
                ▼
              </span>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={`accordion-content ${isOpen ? 'open' : ''}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
            >
              <div className="accordion-content-inner">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
