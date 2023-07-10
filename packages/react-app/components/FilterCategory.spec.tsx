import { render, screen, fireEvent } from '@testing-library/react';
import FilterCategory from './FilterCategory';

describe('FilterCategory', () => {
  test('renders select element', () => {
    render(<FilterCategory />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  test('calls handleCategoryChange when an option is selected', () => {
    const handleCategoryChange = jest.fn();
    render(<FilterCategory  />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'kitchen' } });

    expect(handleCategoryChange).toHaveBeenCalledTimes(1);
    expect(handleCategoryChange).toHaveBeenCalledWith(expect.anything());
  });

  test('displays the selected option', () => {
    const selectedItemCategory = 'kitchen';
    render(<FilterCategory  />);
    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toHaveValue(selectedItemCategory);
  });

  // Add more test cases as needed
});
