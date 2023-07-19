import { render, screen, fireEvent } from '@testing-library/react';
import AddProductModal from './AddProductModal';

describe('AddProductModal', () => {
  test('renders Add Product button', () => {
    render(<AddProductModal />);
    const addButton = screen.getByText('Add Product');
    expect(addButton).toBeInTheDocument();
  });

  test('opens modal when Add Product button is clicked', () => {
    render(<AddProductModal />);
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  test('closes modal when Cancel button is clicked', () => {
    render(<AddProductModal />);
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  test('disables Create button when any input field is empty', () => {
    render(<AddProductModal />);
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    const createButton = screen.getByText('Create');
    const titleInput = screen.getByLabelText('Product Title');
    const imageInput = screen.getByLabelText('Product Image (URL)');
    const categoryInput = screen.getByLabelText('Product Category');
    const locationInput = screen.getByLabelText('Location');
    const priceInput = screen.getByLabelText('Product Price (cUSD)');

    // Fill all fields except one
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(imageInput, {
      target: { value: 'https://example.com/image.jpg' },
    });
    fireEvent.change(categoryInput, { target: { value: 'kitchen' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    expect(createButton).toBeDisabled();

    // Fill the remaining field
    fireEvent.change(titleInput, { target: { value: '' } });
    expect(createButton).toBeDisabled();

    // Fill all fields
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(createButton).not.toBeDisabled();
  });

});
