/**
 * src/utils/constants.js
 * Shared constant arrays used across pages.
 * Extracted from AddFlatPage.jsx to avoid duplication.
 */

import { CITY_COORDINATES } from './cityCoordinates';

export const LOCATIONS = Object.keys(CITY_COORDINATES).sort();

export const AMENITIES = [
  'WiFi',
  'Parking',
  'Kitchen',
  'AC',
  'Pool',
  'Security',
  'Gym',
  'TV',
];
