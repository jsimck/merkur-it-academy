import { h } from 'preact';

import Input from '../Input';

export default {
  title: 'Atom/Input',
  component: Input,
  args: {
    label: 'Input name',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '10em' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const EmailType = Template.bind({});
EmailType.args = { type: 'email' };

export const NumberType = Template.bind({});
NumberType.args = { type: 'number' };
