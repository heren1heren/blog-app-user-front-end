import { render, screen } from '@testing-library/react';
import App from './router-template';
import { BrowserRouter } from 'react-router-dom';
describe('App component', () => {
  it('renders app component', () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const link = screen.getByRole('link'); // if link is find then good
    expect(link).toBeInTheDocument();
  });
});
