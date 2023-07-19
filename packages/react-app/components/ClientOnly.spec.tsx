import { render, screen } from '@testing-library/react';
import ClientOnly from './ClientOnly';

describe('ClientOnly', () => {
  test('renders children when hasMounted is true', () => {
    render(
      <ClientOnly>
        <div>Child Component</div>
      </ClientOnly>
    );
    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  test('does not render children when hasMounted is false', () => {
    render(
      <ClientOnly>
        <div>Child Component</div>
      </ClientOnly>
    );
    const childComponent = screen.queryByText('Child Component');
    expect(childComponent).not.toBeInTheDocument();
  });

});
