const axios = require('axios');

/**
 * Geocoding utility to convert addresses/ZIP codes to coordinates
 * Uses multiple services for reliability
 */
class GeocodingService {
  constructor() {
    this.services = {
      nominatim: 'https://nominatim.openstreetmap.org/search',
      // Add more services as needed
    };
  }

  /**
   * Convert address/ZIP code to coordinates using OpenStreetMap Nominatim (free)
   * @param {string} location - Address or ZIP code
   * @returns {Promise<[number, number]>} - [longitude, latitude]
   */
  async geocodeLocation(location) {
    try {
      // First try with OpenStreetMap Nominatim (free service)
      const response = await axios.get(this.services.nominatim, {
        params: {
          q: location,
          format: 'json',
          limit: 1,
          countrycodes: 'us', // Limit to US for now
          addressdetails: 1
        },
        timeout: 5000,
        headers: {
          'User-Agent': 'Fixlo-App/1.0 (https://www.fixloapp.com)'
        }
      });

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        const longitude = parseFloat(result.lon);
        const latitude = parseFloat(result.lat);
        
        console.log(`✅ Geocoded "${location}" to [${longitude}, ${latitude}]`);
        
        return {
          coordinates: [longitude, latitude],
          address: result.display_name,
          confidence: parseFloat(result.importance) || 0.5
        };
      }
      
      throw new Error('No results found');
    } catch (error) {
      console.error(`❌ Geocoding failed for "${location}":`, error.message);
      
      // Fallback to default coordinates (center of US) if geocoding fails
      return this.getDefaultCoordinates(location);
    }
  }

  /**
   * Get default coordinates based on ZIP code patterns or return center of US
   * @param {string} location 
   * @returns {object}
   */
  getDefaultCoordinates(location) {
    // Basic ZIP code to region mapping (very simplified)
    const zipToRegion = {
      '0': [-71.0589, 42.3601], // Boston area for 0xxxx
      '1': [-74.0059, 40.7128], // NYC area for 1xxxx
      '2': [-77.0369, 38.9072], // DC area for 2xxxx
      '3': [-84.3880, 33.7490], // Atlanta area for 3xxxx
      '4': [-86.7816, 36.1627], // Nashville area for 4xxxx
      '5': [-87.6298, 41.8781], // Chicago area for 5xxxx
      '6': [-95.3698, 29.7604], // Houston area for 6xxxx
      '7': [-96.7970, 32.7767], // Dallas area for 7xxxx
      '8': [-104.9903, 39.7392], // Denver area for 8xxxx
      '9': [-118.2437, 34.0522], // LA area for 9xxxx
    };

    const firstDigit = location.toString().charAt(0);
    const defaultCoords = zipToRegion[firstDigit] || [-98.5795, 39.8283]; // Center of US
    
    console.log(`⚠️  Using default coordinates for "${location}": [${defaultCoords[0]}, ${defaultCoords[1]}]`);
    
    return {
      coordinates: defaultCoords,
      address: location,
      confidence: 0.1 // Low confidence for fallback
    };
  }

  /**
   * Calculate distance between two points in miles
   * @param {number[]} coord1 - [longitude, latitude]
   * @param {number[]} coord2 - [longitude, latitude]
   * @returns {number} - Distance in miles
   */
  calculateDistance(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Validate coordinates
   * @param {number[]} coordinates - [longitude, latitude]
   * @returns {boolean}
   */
  validateCoordinates(coordinates) {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return false;
    }
    
    const [lon, lat] = coordinates;
    return (
      typeof lon === 'number' && 
      typeof lat === 'number' &&
      lon >= -180 && lon <= 180 &&
      lat >= -90 && lat <= 90
    );
  }
}

module.exports = new GeocodingService();
