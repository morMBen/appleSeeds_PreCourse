import React from 'react';

import './Loader.styles.css'

const Loader = () => {


  return (
    <div className="loaderr">
<section className='loader'>
  <div className='loader-center'>
    <div className='chars'>
      <span className='char brace'>&#123;</span>
      <span className='dots'>
        <span className='char dot _dot-1'>.</span>
        <span className='char dot _dot-2'>.</span>
        <span className='char dot _dot-3'>.</span>
      </span>
      <span className='char brace'>&#125;</span>
    </div>
  </div>
</section>
  </div>
  )
}

export default Loader;