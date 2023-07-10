import { render, screen } from '@testing-library/react';
import SuccessAlert from './SuccessAlert';

describe('SuccessAlert', () => {
  test('renders success message', () => {
    const successMessage = 'Success message';

    render(<SuccessAlert message={successMessage} />);

    // Assert that the success message is rendered
    const messageElement = screen.getByText(successMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
