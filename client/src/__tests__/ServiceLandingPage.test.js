import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ServiceLandingPage from '../pages/ServiceLandingPage';

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    service: 'plumbing',
    city: 'new-york'
  })
}));

test('renders service landing page correctly', () => {
  render(
    <BrowserRouter>
      <ServiceLandingPage />
    </BrowserRouter>
  );
  
  // Check if the service title appears
  expect(screen.getByText(/Plumbing in New York/i)).toBeTruthy();
});

test('displays correct service information', () => {
  render(
    <BrowserRouter>
      <ServiceLandingPage />
    </BrowserRouter>
  );
  
  // Check for service title
  expect(screen.getByText(/Plumbing in New York/i)).toBeTruthy();
  
  // Check for key features
  expect(screen.getByText('Vetted Professionals')).toBeTruthy();
  expect(screen.getByText('Top Rated')).toBeTruthy();
  expect(screen.getByText('Best Prices')).toBeTruthy();
});