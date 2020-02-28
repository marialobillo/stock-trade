import React from 'react';


export default function Error({ message, hideError }) {
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error Message: </strong>{message}
        <button 
            type="button" 
            className="close" 
            data-dismiss="alert" 
            aria-label="Close"
            onClick={hideError}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
}