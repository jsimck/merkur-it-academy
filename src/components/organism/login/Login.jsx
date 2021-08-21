import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useCheck, useWidget } from '#/components/hooks';
import { User, LoginButton } from '#/components/molecule';

export default function Login() {
  const {
    setState,
    widget: { state },
  } = useWidget();
  const { execute, isLoading } = useCheck();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    execute().then(({ status, data, message }) => {
      if (status === 'success') {
        setState({
          user: data?.user,
        });
      } else {
        console.error(message);
      }
    });
  }, []);

  return state?.user ? (
    <User />
  ) : (
    <LoginButton disabled={isLoading || typeof window === 'undefined'} />
  );
}
