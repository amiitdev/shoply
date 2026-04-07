// frontend/src/config/toastConfig.js
import { Toaster } from 'react-hot-toast';

// Custom toast component with different positions and styles
const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1F2937',
          color: '#F9FAFB',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#F9FAFB',
          },
          style: {
            background: '#064E3B',
            borderLeft: '4px solid #10B981',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#F9FAFB',
          },
          style: {
            background: '#7F1D1D',
            borderLeft: '4px solid #EF4444',
          },
        },
        loading: {
          duration: Infinity,
          style: {
            background: '#1E3A8A',
          },
        },
      }}
    />
  );
};

// Pre-defined toast functions for common use cases
export const toastStyles = {
  success: {
    style: {
      background: '#10B981',
      color: '#fff',
    },
    icon: '✅',
  },
  error: {
    style: {
      background: '#EF4444',
      color: '#fff',
    },
    icon: '❌',
  },
  warning: {
    style: {
      background: '#F59E0B',
      color: '#fff',
    },
    icon: '⚠️',
  },
  info: {
    style: {
      background: '#3B82F6',
      color: '#fff',
    },
    icon: 'ℹ️',
  },
};

export default CustomToaster;
