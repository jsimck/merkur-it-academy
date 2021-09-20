import { h } from 'preact';

import { TextButton } from '#/components/atom';
import { useLogout, useWidget } from '#/components/hooks';

import './user.less';

export default function User() {
  const {
    widget: { state },
  } = useWidget();
  const { logout, isLoading } = useLogout();
  const handleLogout = async (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="m-user">
      {state.user?.avatar && (
        <img
          className="m-user__img"
          src={state.user?.avatar}
          alt={state.user?.displayName ?? state.user?.username}
        />
      )}
      <span className="m-user__name">
        {state.user?.displayName ?? state.user?.username}
      </span>
      <span className="m-user__separator"></span>
      <TextButton
        disabled={isLoading}
        onClick={handleLogout}
        className="m-user_btn">
        Logout
      </TextButton>
    </div>
  );
}
