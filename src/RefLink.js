import React from 'react'

function RefLink({ userId}) {

  return (
    <div className='RefLink'>
      <h2 className='title'>RefLink</h2>
      <h2 className='title'>{userId}</h2>
    </div>
  );
  
};

export default RefLink;