import React from 'react'

function RefLink({ username}) {

  return (
    <div className='RefLink'>
      <h2 className='title'>RefLink</h2>
      <h2>{username}</h2>
    </div>
  );
  
};

export default RefLink;