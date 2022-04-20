import { useContext, useState } from 'preact/hooks';

import { Modal } from '#/components/atom';
import { LoginForm } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => {
    // TODO use widget public method
  };

  const loginHandler = async ({ username, password }) => {
    // TODO login using widget API
  };

  return (
    <Modal title='Sign in' onBackdrop={closeModal}>
      <LoginForm
        onCancel={closeModal}
        onSubmit={({ username, password }) => {
          loginHandler({ username, password });
        }}
        disabled={isLoading}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}
