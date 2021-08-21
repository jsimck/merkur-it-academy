import { useContext, useMemo, useState } from 'preact/hooks';

import WidgetContext from './WidgetContext';

const BASE_API_URL = 'http://localhost:4444';

function useWidget() {
  const widget = useContext(WidgetContext);

  return useMemo(
    () => ({
      widget,
      openModal: widget.openModal,
      closeModal: widget.closeModal,
      setState: widget.setState,
    }),
    [widget]
  );
}

function useApi(
  path,
  options = {
    method: 'GET',
  }
) {
  const { http } = useContext(WidgetContext);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (body) => {
    let result = null;
    setIsLoading(true);

    try {
      const { response } = await http.request({
        url: `${BASE_API_URL}${path}`,
        method: options?.method ?? 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      result = {
        status: response.status <= 299 ? 'success' : 'error',
        ...response.body,
      };
    } catch (error) {
      console.error(error);

      result = {
        status: 'error',
        message: 'Something unexpected happened.',
      };
    } finally {
      setIsLoading(false);
    }

    return result;
  };

  return { isLoading, execute };
}

function useLogin() {
  return useApi('/auth/login', {
    method: 'POST',
  });
}

function useLogout() {
  return useApi('/auth/logout');
}

function useCheck() {
  return useApi('/auth/check');
}

export { useWidget, useApi, useLogin, useLogout, useCheck };
