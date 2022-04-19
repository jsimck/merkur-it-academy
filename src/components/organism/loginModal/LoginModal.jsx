import { useContext, useState } from 'preact/hooks';

import { Modal } from '#/components/atom';
import { LoginForm } from '#/components/molecule';
import WidgetContext from '#/components/WidgetContext';

export default function LoginModal() {
  const widget = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginHandler = async ({ username, password }) => {
    try {
      setIsLoading(true);
      await widget.login({ username, password });

      widget.setState({
        isModalVisible: false,
      });
    } catch (e) {
      setError(e?.response?.body?.message ?? e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title='Sign in' onBackdrop={widget.closeModal}>
      <LoginForm
        onCancel={widget.closeModal}
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
