import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a username input field', () => {
  render(<App />);
  const usernameElement = screen.getByPlaceholderText(/username/i);
  expect(usernameElement).toBeInTheDocument();
});
