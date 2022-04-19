import { useCallback, useContext, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import WidgetContext from '#/components/WidgetContext';

import './user.less';

export default function User() {
  const widget = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await widget.logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  }, [widget]);

  const { user } = widget?.state ?? {};

  return (
    <div className='m-user'>
      {user?.avatar && (
        <img
          className='m-user__img'
          src={user?.avatar}
          alt={user?.displayName ?? user?.username}
        />
      )}
      <span className='m-user__name'>
        {user?.displayName ?? user?.username}
      </span>
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
