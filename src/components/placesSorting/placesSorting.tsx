import React, { useState } from 'react';
import {TypeSortFilters} from '../../types/types.ts';

interface Props {
  initialSort: TypeSortFilters;
  onChange: (filter: TypeSortFilters) => void;
}
const sortFiltersValues = [
  TypeSortFilters.POPULAR,
  TypeSortFilters.LOW_TO_HIGH,
  TypeSortFilters.HIGH_TO_LOW,
  TypeSortFilters.TOP_RATED,
];

export const PlacesSorting: React.FC<Props> = ({ initialSort, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(initialSort);

  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (newFilter: TypeSortFilters) => {
    setCurrentFilter(newFilter);
    onChange(newFilter);
    setIsOpen(false);
  };

  return (
    <div className="places__sorting" onClick={handleClickOutside}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleMenu}>
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
      >
        {sortFiltersValues.map((filter) => (
          <li
            key={filter}
            className={`places__option ${currentFilter === filter && 'places__option--active'}`}
            tabIndex={0}
            onClick={() => handleOptionClick(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
};
