import { render, screen } from '@testing-library/react';
import LoadingAlert from './LoadingAlert';

describe('LoadingAlert', () => {
  test('renders loading message', () => {
    const loadingMessage = 'Loading...';

    render(<LoadingAlert message={loadingMessage} />);

    // Assert that the loading message is rendered
    const messageElement = screen.getByText(loadingMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
