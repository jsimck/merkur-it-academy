import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { useCheck, useWidget } from '#/components/hooks';
import { User, LoginButton } from '#/components/molecule';

export default function Login() {
  const {
    widget: { state },
  } = useWidget();
  const { check, isLoading } = useCheck();

  // Call only on component mount
  useCallback(() => {
    check();
  }, []);

  return state?.user ? <User /> : <LoginButton disabled={isLoading} />;
}
