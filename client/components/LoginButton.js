import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.css";

function LoginButton() {
  const { loginWithPopup, isAuthenticated } = useAuth0();

  return (
    <div>
      <div class="login-container">
        <div class="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
          <div class="login-header">
            <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
            <h3>Welcome</h3>
            <h5>PLEASE LOG IN</h5>
          </div>
          <div id="error-message" class="alert alert-danger"></div>
          <form onsubmit="return false;" method="post">
            <div class="form-group">
              <label for="name">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div class="form-group">
              <label for="name">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div class="captcha-container form-group"></div>
            <button
              type="submit"
              id="btn-login"
              class="btn btn-primary btn-block"
            >
              Log In
            </button>
            <button
              type="button"
              id="btn-signup"
              class="btn btn-default btn-block"
            >
              Sign Up
            </button>
            <hr />
            <button
              type="button"
              id="btn-google"
              class="btn btn-default btn-danger btn-block"
            >
              Log In with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginButton;
