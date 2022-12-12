import React from 'react';
import Header from './Header';

const NotFound = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="text-center">
      <h1 className="h4 text-muted">
        Страница не найдена
      </h1>
    </div>
  </div>
);

export default NotFound;
