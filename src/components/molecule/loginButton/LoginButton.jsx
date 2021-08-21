import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { TextButton } from '#/components/atom';
import { useWidget } from '#/components/hooks';

import './loginButton.less';

export default function LoginButton({ disabled }) {
  const { openModal } = useWidget();
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      openModal();
    },
    [openModal]
  );

  return (
    <div className="m-login-button">
      <TextButton disabled={disabled} onClick={handleClick}>
        Sign in
      </TextButton>
    </div>
  );
}
