import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

type ErrorProps = {
    message: string;
    hideError: () => void;
}

const Error = ({ message, hideError }: ErrorProps) => {

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