import { useContext, useEffect, useState } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { User } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

import './login.less';

export default function Login() {
  const widget = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(true);

  // Call only on component mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return null;
    }

    // "autologin" functionality
    widget
      .check()
      .catch((error) => {
        setIsLoading(false);
        console.warn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return widget?.state?.user ? (
    <User />
  ) : (
    <div className='m-login__button'>
      <TextButton disabled={isLoading} onClick={widget.openModal}>
        Sign in
      </TextButton>
    </div>
  );
}
