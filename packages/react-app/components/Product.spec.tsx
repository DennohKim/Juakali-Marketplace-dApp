import { render, screen, fireEvent } from '@testing-library/react';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import Product from './Product';

describe('Product', () => {
  test('renders product details', () => {
    const product = {
      owner: '0x1234567890abcdef',
      product_title: 'Test Product',
      image_url: 'https://example.com/product.png',
      category: 'Test Category',
      location: 'Test Location',
      price: 100,
      sold: '10',
      index: 1,
    };

    render(
      <ShoppingCartContext.Provider
        value={{ state: { cart: {} }, dispatch: jest.fn() }}
      >
        <Product
          id={1}
          setError={jest.fn()}
          setLoading={jest.fn()}
          clear={jest.fn()}
          searchQuery=''
          selectedItemCategory=''
        />
      </ShoppingCartContext.Provider>
    );

    const productTitle = screen.getByText('Test Product');
    const productCategory = screen.getByText('Test Category');
    const productSold = screen.getByText('10 Sold');
    const productPrice = screen.getByText('0.1 cUSD');
    const addToCartButton = screen.getByText('+ Add to Cart');

    expect(productTitle).toBeInTheDocument();
    expect(productCategory).toBeInTheDocument();
    expect(productSold).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });

  test('does not render product if search query does not match', () => {
    const product = {
      owner: '0x1234567890abcdef',
      product_title: 'Test Product',
      image_url: 'https://example.com/product.png',
      category: 'Test Category',
      location: 'Test Location',
      price: 100,
      sold: '10',
      index: 1,
    };

    render(
      <ShoppingCartContext.Provider value={{ state: { cart: {}}, dispatch: jest.fn() }}>
        <Product
          id={1}
          setError={jest.fn()}
          setLoading={jest.fn()}
          clear={jest.fn()}
          searchQuery='Invalid'
          selectedItemCategory=''
        />
      </ShoppingCartContext.Provider>
    );

    const productTitle = screen.queryByText('Test Product');
    const productCategory = screen.queryByText('Test Category');
    const productSold = screen.queryByText('10 Sold');
    const productPrice = screen.queryByText('0.1 cUSD');
    const addToCartButton = screen.queryByText('+ Add to Cart');

    expect(productTitle).toBeNull();
    expect(productCategory).toBeNull();
    expect(productSold).toBeNull();
    expect(productPrice).toBeNull();
    expect(addToCartButton).toBeNull();
  });

  test('does not render product if category does not match', () => {
    const product = {
      owner: '0x1234567890abcdef',
      product_title: 'Test Product',
      image_url: 'https://example.com/product.png',
      category: 'Test Category',
      location: 'Test Location',
      price: 100,
      sold: '10',
      index: 1,
    };

    render(
      <ShoppingCartContext.Provider
        value={{ state: { cart: {} }, dispatch: jest.fn() }}
      >
        <Product
          id={1}
          setError={jest.fn()}
          setLoading={jest.fn()}
          clear={jest.fn()}
          searchQuery=''
          selectedItemCategory='Invalid'
        />
      </ShoppingCartContext.Provider>
    );

    const productTitle = screen.queryByText('Test Product');
    const productCategory = screen.queryByText('Test Category');
    const productSold = screen.queryByText('10 Sold');
    const productPrice = screen.queryByText('0.1 cUSD');
    const addToCartButton = screen.queryByText('+ Add to Cart');

    expect(productTitle).toBeNull();
    expect(productCategory).toBeNull();
    expect(productSold).toBeNull();
    expect(productPrice).toBeNull();
    expect(addToCartButton).toBeNull();
  });

  test('dispatches ADD_TO_CART action when "Add to Cart" button is clicked', () => {
    const product = {
      owner: '0x1234567890abcdef',
      product_title: 'Test Product',
      image_url: 'https://example.com/product.png',
      category: 'Test Category',
      location: 'Test Location',
      price: 100,
      sold: '10',
      index: 1,
    };

    const dispatchMock = jest.fn();

    render(
      <ShoppingCartContext.Provider
        value={{ state: { cart: {} }, dispatch: jest.fn() }}
      >
        <Product
          id={1}
          setError={jest.fn()}
          setLoading={jest.fn()}
          clear={jest.fn()}
          searchQuery=''
          selectedItemCategory=''
        />
      </ShoppingCartContext.Provider>
    );

    const addToCartButton = screen.getByText('+ Add to Cart');
    fireEvent.click(addToCartButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: product,
    });
  });

});
