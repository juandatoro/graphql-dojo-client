import React from 'react';

// Components
import BookList from 'components/BookList';

const App = () => {
  return (
    <div id='main'>
      {/* eslint-disable-next-line no-console */}
      {console.log(`This is a ${process.env.NODE_ENV} eviroment`)}
      <h1>Ninja's Reading List</h1>
      <BookList />
    </div>
  );
};

export default App;
