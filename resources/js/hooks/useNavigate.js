import { useCallback } from 'react';
import { router } from '@inertiajs/react';

export const useNavigate = () =>
  useCallback(({ url, method = 'get', params = {}, data = {}, options = {} }) => {
    // eslint-disable-next-line no-undef
    const endpoint = route(url, params);


    switch (method.toLowerCase()) {
      case 'get':
        router.get(endpoint, options);
        break;
      case 'post':
        router.post(endpoint, data, options);
        break;
      case 'put':
        router.put(endpoint, data, options);
        break;
      case 'delete':
        router.delete(endpoint, options);
        break;
      default:
        console.error('Unsupported method:', method);
    }
  }, []);
