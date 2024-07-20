// Sort.js

import { useState } from 'react';

export const useSort = () => {
  const [sortOption, setSortOption] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (option) => {
    if (option === sortOption) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
  };

  const performSort = (a, b) => {
    const valueA = a[sortOption].toLowerCase();
    const valueB = b[sortOption].toLowerCase();

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  };

  return { sortOption, sortDirection, handleSort, performSort };
};
