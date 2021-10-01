import { h } from 'preact';

import User from '../User';

export default {
  title: 'Molecule/User',
  component: User,
  args: {
    label: 'Input name',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '15em' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <User {...args} />;

export const Default = Template.bind({});
Default.args = {
  widget: {
    state: {
      user: {
        displayName: 'John Doe',
        username: 'john.doe',
        avatar: 'https://www.blexar.com/avatar.png',
      },
    },
  },
};
