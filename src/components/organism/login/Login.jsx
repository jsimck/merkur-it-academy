import { useEffect } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { useCheck, useWidget } from '#/components/hooks';
import { User } from '#/components/molecule';

import './login.less';

export default function Login() {
  const {
    openModal,
    widget: { state },
  } = useWidget();
  const { check, isLoading } = useCheck();

  // Call only on component mount
  useEffect(() => {
    check();
  }, []);

  return state?.user ? (
    <User />
  ) : (
    <div className='m-login__button'>
      <TextButton disabled={isLoading} onClick={() => openModal()}>
        Sign in
      </TextButton>
    </div>
  );
}
