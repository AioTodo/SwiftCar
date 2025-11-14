// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// In the test environment we mock Mantine core components with lightweight
// HTML wrappers so tests do not need to mount a real MantineProvider.
jest.mock('@mantine/core', () => {
  const React = require('react');

  const wrap = (tag) =>
    React.forwardRef(({ children, ...props }, ref) =>
      React.createElement(tag, { ref, ...props }, children)
    );

  const Button = wrap('button');

  const TextInput = React.forwardRef(
    ({ label, id, name, error, children, ...props }, ref) => {
      const inputId = id || name;
      const input = React.createElement('input', { id: inputId, name, ref, ...props });

      const errorNode =
        typeof error === 'string' && error.length > 0
          ? React.createElement('span', { 'data-testid': 'input-error' }, error)
          : null;

      if (!label) {
        return React.createElement(React.Fragment, null, input, errorNode, children);
      }

      return React.createElement(
        'label',
        { htmlFor: inputId },
        label,
        input,
        errorNode,
        children
      );
    }
  );

  const Card = wrap('div');
  const Modal = ({ opened, children, ...props }) =>
    opened ? React.createElement('div', props, children) : null;
  const Loader = wrap('div');
  const Alert = wrap('div');
  const Container = wrap('div');
  const Group = wrap('div');
  const Anchor = wrap('a');
  const Text = React.forwardRef(({ component = 'span', children, ...props }, ref) =>
    React.createElement(component, { ref, ...props }, children)
  );
  const Stack = wrap('div');
  const Center = wrap('div');

  const MantineProvider = ({ children }) => React.createElement(React.Fragment, null, children);
  const createTheme = (theme) => theme;

  return {
    // core primitives used in the app
    MantineProvider,
    createTheme,
    Button,
    TextInput,
    Card,
    Modal,
    Loader,
    Alert,
    Container,
    Group,
    Anchor,
    Text,
    Stack,
    Center,
  };
});
