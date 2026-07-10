'use strict';

const CITY_IMAGES = {
  Delhi:
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80',
  Chandigarh:
    'https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?auto=format&fit=crop&q=80',
  Bangalore:
    'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80',
  Mumbai:
    'https://images.unsplash.com/photo-1522444195799-47853b1b608a?auto=format&fit=crop&q=80',
  Goa:
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80',
};

const DEFAULT_CITY_IMAGE =
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80';

/**
 * Returns the stock image URL for a given city name.
 * @param {string} cityName
 * @returns {string}
 */
function getCityImage(cityName) {
  return CITY_IMAGES[cityName] || DEFAULT_CITY_IMAGE;
}

module.exports = { CITY_IMAGES, DEFAULT_CITY_IMAGE, getCityImage };
