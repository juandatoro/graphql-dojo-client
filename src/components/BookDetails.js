import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from 'graphql/queries';

const BookDetails = ({ bookId = '' }) => {
  const { loading, data = {} } = useQuery(getBookQuery, {
    variables: { id: bookId }
  });

  const displayBookDetails = data => {
    const { book } = data;
    if (book) {
      const { name, genre, author } = book;
      return (
        <div>
          <h2>{name}</h2>
          <p>{genre}</p>
          <p>{author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {author.books.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>No book selected</div>;
  };
  return (
    <div id='book-details'>
      {loading ? <div>Loading Book...</div> : displayBookDetails(data)}
    </div>
  );
  // return <div>Hola</div>;
};

export default BookDetails;
