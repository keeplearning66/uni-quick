export interface ToastOptions {
  title?: string;
  icon?: 'success' | 'loading' | 'error' | 'none';
  image?: string;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  mask?: boolean;
}

export interface LoadingOptions {
  show: (content?: string, options?: showLoadingOptions) => void;
  hide: () => void;
}

export interface showLoadingOptions {
  title?: string;
  mask?: boolean;
}

export interface ModalOptions {
  title?: string;
  content?: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
  editable?: boolean;
  placeholderText?: string;
}
