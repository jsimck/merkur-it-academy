import { useContext, useEffect, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { User } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

import './login.less';

export default function Login() {
  const isLoggedIn = false;
  const openModal = () => {
    // TODO use widget public method
  };

  return isLoggedIn ? (
    <User />
  ) : (
    <div className='m-login__button'>
      <TextButton onClick={openModal}>Sign in</TextButton>
    </div>
  );
}
