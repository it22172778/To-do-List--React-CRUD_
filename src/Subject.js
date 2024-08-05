import React from 'react'
import ItemsList from './ItemsList';

const Subject = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemsList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: '2rem' }}>
          Your List Is Empty
        </p>
      )}
    </>
  );
};

export default Subject;