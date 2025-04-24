import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './components/RegisterForm';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Note:  If our form used labels for the input element - the most likely way we would have gone in a more realistic app - we would use the screen.getByLabelText() code instead of the screen.getByPlaceholderText code as shown below.  Obviously our Reg Form is built with only placeholders hence the need for us to use the latter.

describe('RegisterForm', () => {
  test('renders username input field', () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('allows the user to type in the username field', () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  test('submits form with valid data', async () => {
    // Mock the axios POST request to return a success response
    axios.post.mockResolvedValueOnce({ data: { message: 'User registered successfully!' } });
    render(<RegisterForm />);
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    //submit the form
    fireEvent.click(submitButton);

    // Wait for the success message to appear
    await waitFor(() => screen.getByText(/User registered successfully!/i));

    // Assert that the success message is redered
    expect(screen.getByText(/User registered successfully!/i)).toBeInTheDocument();
  });
});
