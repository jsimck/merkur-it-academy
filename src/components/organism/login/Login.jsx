import { useEffect } from 'preact/hooks';

import { useCheck, useWidget } from '#/components/hooks';
import { User, LoginButton } from '#/components/molecule';

export default function Login() {
  const {
    widget: { state },
  } = useWidget();
  const { check, isLoading } = useCheck();

  // Call only on component mount
  useEffect(() => {
    check();
  }, []);

  return state?.user ? <User /> : <LoginButton disabled={isLoading} />;
}
