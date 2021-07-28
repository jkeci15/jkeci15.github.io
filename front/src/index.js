import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { BookContextProvider } from './store/book-context';
import { AuthorContextProvider } from './store/author-context';
import { CategoryContextProvider } from './store/category-context';

ReactDOM.render(
  <AuthContextProvider>
    <BookContextProvider>
      <AuthorContextProvider>
        <CategoryContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CategoryContextProvider>
      </AuthorContextProvider>
    </BookContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
