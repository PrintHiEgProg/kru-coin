import React from 'react'

function RefLink({ user_id }) {

  return (
    <div className='RefLink'>
      <h2 className='title'>RefLink</h2>
      <h2>{user_id}</h2>
    </div>
  );
  
};

export default RefLink;