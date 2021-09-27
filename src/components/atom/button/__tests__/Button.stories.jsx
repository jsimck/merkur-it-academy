import { h } from 'preact';

import Button from '../Button';

export default {
  title: 'Atom/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '10em' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = { primary: true };

export const Secondary = Template.bind({});
Secondary.args = {};

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = { primary: true, isLoading: true };

export const SecondaryLoading = Template.bind({});
SecondaryLoading.args = { isLoading: true };
