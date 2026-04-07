import React from 'react';
import AppRoutes from './routes/AppRoutes';
import AdminLogin from './components/AdminLogin';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f1f2e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <AppRoutes />
    </div>
  );
};

export default App;
