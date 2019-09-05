import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from 'graphql/queries';

// Components
import BookDetails from 'components/BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState('000000000000');

  const displayBooks = booksData => {
    const { books = [] } = booksData;
    return books.map(({ name, id }) => (
      <li key={id}>
        <button onClick={() => setSelected(id)} type='button'>
          {name}
        </button>
      </li>
    ));
  };

  if (loading) return <div>Loading Books...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div>
      <ul id='book-list'>{displayBooks(data)}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
