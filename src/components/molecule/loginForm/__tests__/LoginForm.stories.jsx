import { h } from 'preact';

import LoginForm from '../LoginForm';

export default {
  title: 'Molecule/LoginForm',
  component: LoginForm,
  args: {
    error: null,
    disabled: false,
    isLoading: false,
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    error: {
      type: 'string',
      description: 'Error message to display in login form',
    },
  },
};

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const ErrorState = Template.bind({});
ErrorState.args = { error: 'Error message' };

export const LoadingState = Template.bind({});
LoadingState.args = { isLoading: true };
