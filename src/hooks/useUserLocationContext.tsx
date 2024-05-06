import React from 'react';
import { UserLocationContext } from '../context/UserLocationContext';

export const useUserLocationContext = () => {
  return React.useContext(UserLocationContext);
};