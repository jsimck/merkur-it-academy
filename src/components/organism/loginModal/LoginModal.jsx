import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';

import sha3 from 'crypto-js/sha3';

import { Modal } from '#/components/atom';
import { useLogin, useWidget } from '#/components/hooks';
import { LoginForm } from '#/components/molecule';

export default function LoginModal() {
  const { setState, closeModal } = useWidget();
  const { execute, isLoading } = useLogin();
  const [error, setError] = useState(null);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleSubmit = async ({ username, password }) => {
    setError(null);
    const { status, data, message } = await execute({
      username,
      password: sha3(password).toString(),
    });

    if (status === 'success') {
      setState({
        user: data?.user,
        isModalVisible: false,
      });
    } else {
      setError(message);
      console.error(message);
    }
  };

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
