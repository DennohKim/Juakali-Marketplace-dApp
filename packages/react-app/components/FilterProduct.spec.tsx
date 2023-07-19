import { render, screen } from '@testing-library/react';
import FilterProduct from './FilterProduct';

describe('FilterProduct', () => {
  test('renders Search component', () => {
    render(<FilterProduct />);
    const searchComponent = screen.getByLabelText('search-input');
    expect(searchComponent).toBeInTheDocument();
  });

  test('renders FilterCategory component', () => {
    render(<FilterProduct />);
    const filterCategoryComponent = screen.getByRole('combobox');
    expect(filterCategoryComponent).toBeInTheDocument();
  });

});
