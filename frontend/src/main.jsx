import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.js';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
  </React.StrictMode>,
)
