import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { Modal } from '#/components/atom';
import { useLogin, useWidget } from '#/components/hooks';
import { LoginForm } from '#/components/molecule';

export default function LoginModal() {
  const { closeModal } = useWidget();
  const { isLoading, login, error } = useLogin();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleSubmit = useCallback(
    ({ username, password }) => {
      login({ username, password });
    },
    [login]
  );

  return (
    <Modal title="Sign in" onBackdrop={handleClose}>
      <LoginForm
        onCancel={handleClose}
        onSubmit={handleSubmit}
        disabled={isLoading}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}
