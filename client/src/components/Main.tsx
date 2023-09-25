import { ReactNode } from "react";

type MainProps = {
    children: ReactNode;
    center?: boolean;
};

const Main = ({ children, center }: MainProps) => {
    const classes = `${center ? 'main-center': ''}`
    return <main className={classes}>{children}</main>;
};

export default Main;
