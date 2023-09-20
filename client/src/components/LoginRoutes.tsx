
type LoginRoutesProps = {
    user: { username: string };
    logout: () => void;
}

const LoginRoutes = ({ user, logout }: LoginRoutesProps) => {
    const handleOnClick = () => {
        logout();
    };
    return (
        <>
            <span className="hello-name">Hello, {user.username}</span>
            <span>
                <a className="text-warning" onClick={handleOnClick}>
                    Logout
                </a>
            </span>
        </>
    );
};

export default LoginRoutes;
