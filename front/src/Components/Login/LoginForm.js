import Email from './Email';
import LoginButton from './LoginButton';
import Password from './Password';
import Card from '../Card'
import './LoginForm.css'

const LoginForm = () => {

    return (
        <Card className="new-expense__controls">
            <h2> Sign In</h2>
            <form>
                <Email />
                <Password />
                <LoginButton />
            </form>
        </Card>
    );
}
export default LoginForm;