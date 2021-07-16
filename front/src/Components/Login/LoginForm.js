import Email from './Email';
import LoginButton from './LoginButton';
import Password from './Password';

const LoginForm = () => {

    return (
        <div>
            <h2> Sign In</h2>
            <form>
                <Email />
                <Password />
                <LoginButton />
            </form>
        </div>
    );
}
export default LoginForm;