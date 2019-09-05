import React, { useRef, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from 'graphql/queries';

const AddBook = () => {
  const { loading, error, data: queryData } = useQuery(getAuthorsQuery);
  const [addBook, { data: mutationData }] = useMutation(addBookMutation);
  const [message, setMessage] = useState('');
  const nameRef = useRef(null);
  const genreRef = useRef(null);
  const authorIdRef = useRef(null);

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

  const handleFormSubmit = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const genre = genreRef.current.value;
    const authorId = authorIdRef.current.value;
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
    nameRef.current.value = '';
    genreRef.current.value = '';
    authorIdRef.current.value = '';
  };

  useEffect(() => {
    let timer;
    if (mutationData) {
      setMessage(<div>Book Created</div>);
      timer = setTimeout(() => {
        setMessage('');
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [mutationData]);

  if (error) return <div>Error :(</div>;
  return (
    <>
      <form id='add-book' onSubmit={e => handleFormSubmit(e)}>
        <div className='field'>
          <label htmlFor='book-name'>
            <span>Book Name:</span>
            <input ref={nameRef} id='book-name' type='text' />
          </label>
        </div>

        <div className='field'>
          <label htmlFor='book-genre'>
            <span>Genre:</span>
            <input ref={genreRef} id='book-genre' type='text' />
          </label>
        </div>

        <div className='field'>
          <label htmlFor='book-author'>
            <span>Author:</span>
            <select ref={authorIdRef} id='book-author'>
              <option value=''>Select Author</option>
              {displayAuthors(loading, queryData)}
            </select>
          </label>
        </div>
        <button type='submit'>+</button>
      </form>
      {message}
    </>
  );
};

export default AddBook;
