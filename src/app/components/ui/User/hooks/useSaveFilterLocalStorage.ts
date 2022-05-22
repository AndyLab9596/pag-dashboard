import { useState, useEffect, useLayoutEffect } from 'react';
import isEmpty from 'lodash/isEmpty';

const defaultActiveFilters = [];

export default function useSaveFilterLocalStorage(localStorageKey: string, onChange): any {
  const [savedFilters, setSavedFilters] = useState({});
  const [activeSavedFilter, setActiveSavedFilter] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState(defaultActiveFilters);

  useLayoutEffect(() => {
    const savedFilters = localStorage.getItem(localStorageKey);

    if (savedFilters) {
      const parsedSavedFilters = JSON.parse(savedFilters);
      setSavedFilters(parsedSavedFilters);

      //auto load end save filter
      const endKeySavedFilters = Object.keys(parsedSavedFilters).pop();
      if (endKeySavedFilters) {
        const { filterValue, activeFilters } = parsedSavedFilters[endKeySavedFilters];
        setActiveSavedFilter(endKeySavedFilters);
        onChange(filterValue);
        setActiveFilters(activeFilters);
        return;
      }
    } else {
      setSavedFilters([]);
    }

    setActiveFilters(defaultActiveFilters);
    onChange({});
    setActiveSavedFilter(null);
  }, [localStorageKey]);

  useEffect(() => {
    if (!isEmpty(savedFilters)) {
      localStorage.setItem(localStorageKey, JSON.stringify(savedFilters));
    }
  }, [savedFilters]);

  return {
    savedFilters,
    setSavedFilters,
    activeSavedFilter,
    setActiveSavedFilter,
    activeFilters,
    setActiveFilters,
  };
}
