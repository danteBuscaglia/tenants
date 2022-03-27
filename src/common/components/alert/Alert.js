import React, { useEffect } from 'react'

const Alert = ({ msg, type, setIsShown }) => {

  useEffect(() => {
    if (setIsShown)
      setTimeout(() => {
        setIsShown(false);
      }, 2000);
  }, []);

  return (
    <div className={`alert alert-${type} mt-2`} role="alert">
      {msg}
    </div>
  )
}

export default Alert