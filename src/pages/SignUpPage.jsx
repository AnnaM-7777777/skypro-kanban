import AuthForm from "./AuthForm";

const SignUpPage = ({ setIsAuth }) => {
    return <AuthForm isSignUp={true} setIsAuth={setIsAuth} />;
};

export default SignUpPage;
