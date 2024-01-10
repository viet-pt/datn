import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { useStore } from './redux';
import { Provider } from 'react-redux';
import AppWrapper from 'pages/AppWrapper';

import './css/index.scss';
import 'antd/dist/antd.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, cacheTime: 500, retry: false },
  },
});

function App() {
  const location = useLocation();
  const store = useStore();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppWrapper />
        </QueryClientProvider>
      </Provider>
    </Router>
  );
}

export default App;
