import React from 'react'

const Main = ({ children, center }) => {
    let classes = `main ${center ? 'main-center': ''}`

    return(
        <div className={classes}>
            {children}
        </div>
    )
}

export default Main