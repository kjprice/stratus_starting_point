import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();

ReactDOM.render(<App />, document.querySelector('#root'));
