import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';


describe('Search', () => {
  test('calls handleSearch on input change', () => {
    const handleSearch = jest.fn();

    render(<Search handleSearch={handleSearch} />);

    // Get the input element
    const inputElement = screen.getByRole('searchbox');

    // Simulate user input
    const searchQuery = 'Product ABC';
    fireEvent.change(inputElement, { target: { value: searchQuery } });

    // Assert that handleSearch is called with the correct value
    expect(handleSearch).toHaveBeenCalledWith(searchQuery);
  });
});
