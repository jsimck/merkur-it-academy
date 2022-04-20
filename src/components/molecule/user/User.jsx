import { useContext, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import WidgetContext from '#/components/WidgetContext';

import './user.less';

export default function User() {
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    // TODO logout using widget API
  };

  // TODO Render user from widget.state
  return (
    <div className='m-user'>
      <img className='m-user__img' />
      <span className='m-user__name'></span>
      <span className='m-user__separator'></span>
      <TextButton
        disabled={isLoading}
        onClick={logoutHandler}
        className='m-user_btn'
      >
        Logout
      </TextButton>
    </div>
  );
}
