import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Eureka from '../pages/Eureka';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

const EurekaWithRouter = () => (
  <BrowserRouter>
    <Eureka />
  </BrowserRouter>
);

describe('Eureka Discovery Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders eureka discovery form', () => {
    render(<EurekaWithRouter />);
    
    expect(screen.getByText('💡 Eureka Discovery')).toBeInTheDocument();
    expect(screen.getByText('Tell us about your home issue')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Describe your home issue/)).toBeInTheDocument();
    expect(screen.getByText('🚀 Discover Solutions')).toBeInTheDocument();
  });

  test('requires problem description', () => {
    render(<EurekaWithRouter />);
    
    const submitButton = screen.getByText('🚀 Discover Solutions');
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when problem is entered', () => {
    render(<EurekaWithRouter />);
    
    const problemInput = screen.getByPlaceholderText(/Describe your home issue/);
    const submitButton = screen.getByText('🚀 Discover Solutions');
    
    fireEvent.change(problemInput, { target: { value: 'My faucet is leaking' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  test('submits form and displays discovery results', async () => {
    const mockDiscovery = {
      success: true,
      discovery: {
        eurekaInsight: '💡 Eureka! Your plumbing issue is high priority.',
        analysis: 'Based on your description, I\'ve identified potential solutions.',
        recommendations: [{
          type: 'Plumbing',
          confidence: 0.95,
          description: 'Water-related issues require immediate attention',
          urgency: 'High',
          estimatedCost: '$200-$800',
          steps: ['Turn off water supply', 'Contact plumber']
        }],
        nextSteps: ['Review recommendations', 'Contact professionals']
      }
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockDiscovery });

    render(<EurekaWithRouter />);
    
    const problemInput = screen.getByPlaceholderText(/Describe your home issue/);
    const submitButton = screen.getByText('🚀 Discover Solutions');
    
    fireEvent.change(problemInput, { target: { value: 'My kitchen faucet is leaking constantly' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('🔍 Analyzing...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('💡 Eureka! Your plumbing issue is high priority.')).toBeInTheDocument();
    });

    expect(screen.getByText('🎯 Recommended Professionals')).toBeInTheDocument();
    expect(screen.getByText('Plumbing')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'API Error' } }
    });

    render(<EurekaWithRouter />);
    
    const problemInput = screen.getByPlaceholderText(/Describe your home issue/);
    const submitButton = screen.getByText('🚀 Discover Solutions');
    
    fireEvent.change(problemInput, { target: { value: 'Test problem' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });
});