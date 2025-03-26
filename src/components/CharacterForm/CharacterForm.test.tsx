import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterForm from './CharacterForm';
import { Character } from '../../lib/schema';
import '@testing-library/jest-dom';

describe('CharacterForm', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();
  const mockReset = jest.fn();
  const initialValues = {
    name: 'Jon Snow',
    gender: 'Male',
    born: '1990-01-01T00:00:00Z',
    allegiances: ['House Stark'],
    aliases: ['The White Wolf']
  } as Partial<Character>;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(
      <CharacterForm 
        initialValues={initialValues}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
        onReset={mockReset}
      />
    );

    expect(screen.getByDisplayValue('Jon Snow')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeChecked();
    expect(screen.getByText('Jan 1, 1990')).toBeInTheDocument();
    expect(screen.getByText('House Stark')).toBeInTheDocument();
    expect(screen.getByText('The White Wolf')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<CharacterForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Gender is required')).toBeInTheDocument();
    });
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('submits valid form', async () => {
    render(<CharacterForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Arya Stark' } });
    fireEvent.click(screen.getByLabelText('Female'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Arya Stark',
        gender: 'Female',
        born: undefined,
        died: undefined,
        allegiances: [],
        aliases: []
      });
    });
  });

  test('handles date selection', async () => {
    render(<CharacterForm onSubmit={mockSubmit} />);

    // Open born date picker
    fireEvent.click(screen.getAllByText('Pick a date')[0]);
    
    // Select a date
    fireEvent.click(screen.getByText('15'));
    
    await waitFor(() => {
      expect(screen.getByText('Apr 15, 2023')).toBeInTheDocument();
    });
  });

  test('adds and removes aliases', async () => {
    render(<CharacterForm onSubmit={mockSubmit} />);

    const aliasInput = screen.getByPlaceholderText('Add alias');
    const addButton = screen.getByText('Add');

    // Add alias
    fireEvent.change(aliasInput, { target: { value: 'Needle' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Needle')).toBeInTheDocument();

    // Remove alias
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Needle')).not.toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(
      <CharacterForm 
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCancel).toHaveBeenCalled();
  });

  test('resets form when reset button is clicked', () => {
    render(
      <CharacterForm 
        initialValues={initialValues}
        onSubmit={mockSubmit}
        onReset={mockReset}
      />
    );

    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Sansa' } });
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByDisplayValue('Jon Snow')).toBeInTheDocument();
    expect(mockReset).toHaveBeenCalled();
  });

  test('validates death date is after birth date', async () => {
    render(<CharacterForm onSubmit={mockSubmit} />);

    // Set birth date
    fireEvent.click(screen.getAllByText('Pick a date')[0]);
    fireEvent.click(screen.getByText('15'));
    
    // Set death date before birth date
    fireEvent.click(screen.getAllByText('Pick a date')[1]);
    fireEvent.click(screen.getByText('10'));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Death date must be after birth date')).toBeInTheDocument();
    });
  });
});