import React, { useEffect } from 'react'
import './loader.css'

const Loader = ({ isShown }) => {

  return (
    <>
      {isShown && (
        <div className='loading-container'>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  )

}

export default Loader