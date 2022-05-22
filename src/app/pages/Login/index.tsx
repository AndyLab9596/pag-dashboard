import { LoginForm } from './LoginForm/LoginForm';
import { defaultImgLogo } from '../../../common/helpper';
import subLogo from './home_window1.png';
import './LoginStyle.scss';

export function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-title">
          <div className="login-logo">
            <img src={defaultImgLogo} alt="logo" />
          </div>
          <span>Welcome to PAG Evaluations</span>
        </div>
        <div className="login-component">
          <LoginForm />
        </div>
        <img className="sub-logo" src={subLogo} alt="sub" />
      </div>
    </div>
  );
}
