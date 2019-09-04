import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = (loadingData, authorsData) => {
    const { authors = [] } = authorsData;
    return loadingData ? (
      <option disabled>Loading Authors...</option>
    ) : (
      authors.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))
    );
  };

  if (error) return <div>Error :(</div>;
  return (
    <form id='add-book'>
      <div className='field'>
        <label htmlFor='book-name'>
          Book Name:
          <input id='book-name' type='text' />
        </label>
      </div>

      <div className='field'>
        <label htmlFor='book-genre'>
          Genre:
          <input id='book-genre' type='text' />
        </label>
      </div>

      <div className='field'>
        <label htmlFor='book-author'>
          Author:
          <select id='book-author'>
            <option>Select Author</option>
            {displayAuthors(loading, data)}
          </select>
        </label>
      </div>

      <button type='submit'>+</button>
    </form>
  );
};

export default AddBook;
