import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = booksData => {
    const { books = [] } = booksData;
    return books.map(({ name, id }) => <li key={id}>{name}</li>);
  };

  if (loading) return <div>Loading Books...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div>
      <ul id='book-list'>{displayBooks(data)}</ul>
    </div>
  );
};

export default BookList;
