import { useContext } from 'react';
import { SchoolStoreContext } from './SchoolStoreProvider';

export const useSchoolStore = () => {
  const context = useContext(SchoolStoreContext);
  if (!context) {
    throw new Error('useSchoolStore must be used within a SchoolStoreProvider');
  }
  return context;
};
