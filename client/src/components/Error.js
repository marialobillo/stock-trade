import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'


const Error = ({ message, hideError }) => {
    if(!message){
        return null
    }

    return (
        <div className="error-container" role="alert">
            <div className="error-inner">
                <span className="block">{message}</span>
                <button className="error-icon" onClick={hideError}>
                    <FontAwesomeIcon className="error-icon" icon={faTimesCircle} />
                </button>
            </div>
        </div>
    )
}

export default Error