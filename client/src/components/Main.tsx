
type MainProps = {
    children: React.ReactNode;
    center?: boolean;
}

const Main = ({ children, center }: MainProps) => {
    const classes: string = `main ${center ? 'main-center': ''}`

    return(
        <div className={classes}>
            {children}
        </div>
    )
}

export default Main