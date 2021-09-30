import { useRef } from 'preact/hooks';

import { Button, Input } from '#/components/atom';

import './loginForm.less';

function useLoginForm({ onSubmit, onCancel }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return {
    usernameRef,
    passwordRef,
    handleCancel,
    handleSubmit,
  };
}

export default function LoginForm({
  onSubmit,
  onCancel,
  error,
  disabled = false,
  isLoading = false,
}) {
  const { passwordRef, usernameRef, handleCancel, handleSubmit } = useLoginForm(
    { onSubmit, onCancel }
  );

  return (
    <form onSubmit={handleSubmit} className='m-login-form'>
      <Input label='Username:' ref={usernameRef} disabled={disabled} />
      <Input
        label='Password:'
        type='password'
        ref={passwordRef}
        disabled={disabled}
      />
      {error && <div className='m-login-form__error'>{error}</div>}
      <div className='m-login-form__footer'>
        <Button isLoading={isLoading} disabled={disabled} type='submit' primary>
          Submit
        </Button>
        <Button disabled={disabled} onClick={handleCancel}>
          Close
        </Button>
      </div>
    </form>
  );
}
