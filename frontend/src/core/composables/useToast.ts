import { reactive } from 'vue';

export interface ToastHandler {
  open: boolean;
  type: 'success' | 'error';
  content: string;
}

export const useToast = () => {
  const toastState = reactive<ToastHandler>({
    open: false,
    type: 'success',
    content: '',
  });

  const handleToast = (content: string, type: 'success' | 'error') => {
    toastState.open = true;
    toastState.content = content;
    toastState.type = type;

    setTimeout(() => {
      toastState.open = false;
    }, 2000);
  };

  const manageToastState = (
    status: number,
    sucessText: string,
    errorText: string
  ) => {
    if (status === 400) {
      const errorMessage = errorText;
      handleToast(errorMessage, 'error');

      return;
    }

    handleToast(sucessText, 'success');
  };

  return { toastState, manageToastState };
};
