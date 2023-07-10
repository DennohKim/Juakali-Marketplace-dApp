import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders Celo Logo', () => {
    render(<Header />);
    const celoLogo = screen.getByAltText('Celo Logo');
    expect(celoLogo).toBeInTheDocument();
  });

  test('renders Home link', () => {
    render(<Header />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('displays balance when user is connected and has a balance', () => {
    // Mock the useAccount and useBalance hooks
    jest.mock('wagmi', () => ({
      useAccount: () => ({
        address: '0x123abc',
        isConnected: true,
      }),
      useBalance: () => ({
        data: { formatted: '100.00' },
      }),
    }));

    render(<Header />);

    const balanceElement = screen.getByText('Balance: 100.00 cUSD');
    expect(balanceElement).toBeInTheDocument();
  });

  test('does not display balance when user is not connected', () => {
    // Mock the useAccount hook
    jest.mock('wagmi', () => ({
      useAccount: () => ({
        address: '',
        isConnected: false,
      }),
    }));

    render(<Header />);

    const balanceElement = screen.queryByText(/Balance:/);
    expect(balanceElement).not.toBeInTheDocument();
  });

  test('does not display balance when user is connected but does not have a balance', () => {
    // Mock the useAccount and useBalance hooks
    jest.mock('wagmi', () => ({
      useAccount: () => ({
        address: '0x123abc',
        isConnected: true,
      }),
      useBalance: () => ({
        data: null,
      }),
    }));

    render(<Header />);

    const balanceElement = screen.queryByText(/Balance:/);
    expect(balanceElement).not.toBeInTheDocument();
  });

  // Add more test cases as needed
});
