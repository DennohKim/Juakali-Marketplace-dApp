import { render, screen, fireEvent } from '@testing-library/react';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert', () => {
  test('renders error message and calls clear function on close icon click', () => {
    const errorMessage = 'An error occurred';
    const clearMock = jest.fn();

    render(<ErrorAlert message={errorMessage} clear={clearMock} />);

    // Assert that the error message is rendered
    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();

    // Get the close icon element
    const closeIconElement = screen.getByTitle('Close');

    // Simulate click on the close icon
    fireEvent.click(closeIconElement);

    // Assert that the clear function is called
    expect(clearMock).toHaveBeenCalled();
  });
});
