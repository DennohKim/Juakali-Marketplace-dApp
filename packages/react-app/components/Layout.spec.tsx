import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  test('renders children', () => {
    render(
      <Layout>
        <div data-testid='child-component'>Child Component</div>
      </Layout>
    );

    const childComponent = screen.getByTestId('child-component');
    expect(childComponent).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(
      <Layout>
        <div data-testid='child-component'>Child Component</div>
      </Layout>
    );
    const headerComponent = screen.getByRole('navigation');
    expect(headerComponent).toBeInTheDocument();
  });

  test('renders AddProductModal component', () => {
    render(
      <Layout>
        <div data-testid='child-component'>Child Component</div>
      </Layout>
    );
    const addProductModalComponent = screen.getByLabelText('Add Product');
    expect(addProductModalComponent).toBeInTheDocument();
  });

  test('renders CheckoutModal component', () => {
    render(
      <Layout>
        <div data-testid='child-component'>Child Component</div>
      </Layout>
    );
    const checkoutModalComponent = screen.getByLabelText('Checkout');
    expect(checkoutModalComponent).toBeInTheDocument();
  });

    test('renders ClientOnly component', () => {
      render(
        <Layout>
          <div data-testid='child-component'>Child Component</div>
        </Layout>
      );
      const clientOnlyComponent = screen.getByTestId('client-only-component');
      expect(clientOnlyComponent).toBeInTheDocument();
    });

});
