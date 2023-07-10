import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
  test('renders cart icon', () => {
    render(<CheckoutModal />);
    const cartIcon = screen.getByLabelText('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });

  test('opens modal when cart icon is clicked', () => {
    render(<CheckoutModal />);
    const cartIcon = screen.getByLabelText('cart-icon');
    fireEvent.click(cartIcon);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  test('closes modal when Cancel button is clicked', () => {
    render(<CheckoutModal />);
    const cartIcon = screen.getByLabelText('cart-icon');
    fireEvent.click(cartIcon);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  // Add more test cases as needed
});
