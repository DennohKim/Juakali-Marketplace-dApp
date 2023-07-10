import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

jest.mock('@/context/MarketPlaceContext', () => ({
  useMarketPlace: jest.fn(() => ({
    getProducts: jest.fn(() => [
      {
        id: 1,
        product_title: 'Product 1',
        image_url: 'https://example.com/product1.png',
        category: 'Category 1',
        price: 10,
      },
      {
        id: 2,
        product_title: 'Product 2',
        image_url: 'https://example.com/product2.png',
        category: 'Category 2',
        price: 20,
      },
    ]),
    error: null,
    success: null,
    loading: false,
    clear: jest.fn(),
  })),
}));

describe('ProductList', () => {
  test('renders products', () => {
    render(<ProductList />);

    // Assert on the rendering of products
    const product1 = screen.getByText('Product 1');
    const product2 = screen.getByText('Product 2');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  test('renders error alert', () => {
    // Mock error message
    const error = 'Failed to load products';

    render(<ProductList />);

    // Assert on the rendering of error alert
    const errorAlert = screen.getByText(error);
    expect(errorAlert).toBeInTheDocument();
  });

  test('renders success alert', () => {
    // Mock success message
    const success = 'Products loaded successfully';

    render(<ProductList />);

    // Assert on the rendering of success alert
    const successAlert = screen.getByText(success);
    expect(successAlert).toBeInTheDocument();
  });

  test('renders loading alert', () => {
    render(<ProductList />);

    // Assert on the rendering of loading alert
    const loadingAlert = screen.getByText('Loading...');
    expect(loadingAlert).toBeInTheDocument();
  });

  
});
