import React, { useEffect, useState } from "react";
import tw, { styled, theme } from "twin.macro";
import { Danger } from "@icons/Danger";

const RegisterLink = ({ type, setAuthView }) => {
  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      setAuthView(type);
    }
  };

  if (type === "forgot") {
    return (
      <RegisterSection>
        Forgot your password?
        <StyledLink
          onClick={() => setAuthView("forgotten_password")}
          onKeyDown={(e) => handleKeyPress(e, "forgotten_password")}
          tabIndex={0}
        >
          Forgot Password
        </StyledLink>
      </RegisterSection>
    );
  } else if (type === "magic") {
    return (
      <StyledLink
        type="magic"
        onClick={() => setAuthView("magic_link")}
        onKeyDown={(e) => handleKeyPress(e, "magic_link")}
        tabIndex={0}
      >
        Send Magic Link
      </StyledLink>
    );
  } else if (type === "sign_in") {
    return (
      <RegisterSection>
        Already have an account?
        <StyledLink
          onClick={() => setAuthView("sign_in")}
          onKeyDown={(e) => handleKeyPress(e, "sign_in")}
          tabIndex={0}
        >
          Log In
        </StyledLink>
      </RegisterSection>
    );
  }
  return (
    <RegisterSection>
      Create an account?
      <StyledLink
        onClick={() => setAuthView("sign_up")}
        onKeyDown={(e) => handleKeyPress(e, "sign_up")}
        tabIndex={0}
      >
        Register
      </StyledLink>
    </RegisterSection>
  );
};

const SignInForm = ({
  email,
  setEmail,
  handleSignIn,
  password,
  setPassword,
  setAuthView,
}) => {
  return (
    <>
      <FormHeader>Log In</FormHeader>
      <StyledForm onSubmit={(e) => handleSignIn(e)}>
        <label htmlFor="sign-in__email">Email</label>
        <StyledInput
          id="sign-in__email"
          label="Email address"
          autoComplete="email"
          placeholder="your@email.ca"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="sign-in__password">Password</label>
        <StyledInput
          id="sign-in__password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Log In</StyledButton>
      </StyledForm>
      <RegisterLink type="forgot" setAuthView={setAuthView} />
      <StyledDivider />
      <AdditionalLinks>
        <RegisterLink setAuthView={setAuthView} />
        <RegisterLink type="magic" setAuthView={setAuthView} />
      </AdditionalLinks>
    </>
  );
};

const SignUpForm = ({
  email,
  setEmail,
  handleSignUp,
  password,
  setPassword,
  setAuthView,
}) => {
  return (
    <>
      <FormHeader>Register</FormHeader>
      <StyledForm onSubmit={(e) => handleSignUp(e)}>
        <label htmlFor="sign-up__email">Email</label>
        <StyledInput
          id="sign-up__email"
          label="Email address"
          autoComplete="email"
          placeholder="your@email.ca"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="sign-up__password">Password</label>
        <StyledInput
          id="sign-up__password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Register</StyledButton>
      </StyledForm>
      <RegisterLink type="forgot" setAuthView={setAuthView} />
      <StyledDivider />
      <AdditionalLinks>
        <RegisterLink type="sign_in" setAuthView={setAuthView} />
        <RegisterLink type="magic" setAuthView={setAuthView} />
      </AdditionalLinks>
    </>
  );
};

const ForgotPassForm = ({
  handlePasswordReset,
  email,
  setEmail,
  setAuthView,
}) => {
  return (
    <>
      <FormHeader>Reset Your Password</FormHeader>
      <StyledForm onSubmit={handlePasswordReset}>
        <label htmlFor="forgotten_password__email">Email</label>
        <StyledInput
          id="forgotten_password__email"
          label="Email address"
          autoComplete="email"
          placeholder="your@email.ca"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledButton type="submit">Reset Password</StyledButton>
      </StyledForm>
      <AdditionalLinks>
        <RegisterLink setAuthView={setAuthView} />
        <StyledDivider />
        <RegisterLink type="sign_in" setAuthView={setAuthView} />
        <RegisterLink type="magic" setAuthView={setAuthView} />
      </AdditionalLinks>
    </>
  );
};

const MagicForm = ({ handleMagicLinkSignIn, email, setEmail, setAuthView }) => {
  return (
    <>
      <FormHeader>Log in with Magic Link</FormHeader>
      <StyledForm onSubmit={handleMagicLinkSignIn}>
        <StyledInput
          label="Email address"
          autoComplete="email"
          placeholder="Type in your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledButton type="submit">Send Magic Link</StyledButton>
      </StyledForm>
      <AdditionalLinks>
        <RegisterLink setAuthView={setAuthView} />
        <StyledDivider />

        <RegisterLink type="sign_in" setAuthView={setAuthView} />
      </AdditionalLinks>
    </>
  );
};

function Auth(props) {
  const { supabaseClient, authView, setAuthView } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabaseClient.auth.signIn({
      email,
      password,
    });
    if (signInError) setError(signInError.message);

    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    if (signUpError) setError(signUpError.message);

    setLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );
    if (error) setError(error.message);
    else setMessage("Check your email for the password reset link");
    setLoading(false);
  };

  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn({ email });
    if (error) setError(error.message);
    else setMessage("Check your email for the magic link");
    setLoading(false);
  };

  return (
    <StyledContainer>
      {loading && <h3>Loading..</h3>}
      {error && (
        <NotificationMessage type="error">
          <Danger />
          <span>{error}</span>
        </NotificationMessage>
      )}
      {message && (
        <NotificationMessage type="message">
          <Danger />
          <span>{message}</span>
        </NotificationMessage>
      )}
      {authView === "sign_in" ? (
        <SignInForm
          email={email}
          setEmail={setEmail}
          handleSignIn={handleSignIn}
          password={setPassword}
          setPassword={setPassword}
          setAuthView={setAuthView}
        />
      ) : authView === "sign_up" ? (
        <SignUpForm
          email={email}
          setEmail={setEmail}
          handleSignUp={handleSignUp}
          password={setPassword}
          setPassword={setPassword}
          setAuthView={setAuthView}
        />
      ) : authView === "forgotten_password" ? (
        <ForgotPassForm
          handlePasswordReset={handlePasswordReset}
          email={email}
          setEmail={setEmail}
          setAuthView={setAuthView}
        />
      ) : authView === "magic_link" ? (
        <MagicForm
          handleMagicLinkSignIn={handleMagicLinkSignIn}
          email={email}
          setEmail={setEmail}
          setAuthView={setAuthView}
        />
      ) : null}
    </StyledContainer>
  );
}

function UpdatePassword({ supabaseClient }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { error } = await supabaseClient.auth.update({ password });
    if (error) setError(error.message);
    else setMessage("Your password has been updated");
    setLoading(false);
  };

  return (
    <StyledContainer>
      {loading && <h3>Loading..</h3>}
      {error && <NotificationMessage type="error">{error}</NotificationMessage>}
      {message && (
        <NotificationMessage type="message">{message}</NotificationMessage>
      )}
      <FormHeader>Set a new password</FormHeader>
      <StyledForm onSubmit={handlePasswordReset}>
        <input
          label="New password"
          placeholder="Enter your new password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button block size="large" htmlType="submit">
          Update password
        </button>
      </StyledForm>
    </StyledContainer>
  );
}

Auth.UpdatePassword = UpdatePassword;
export default Auth;

const StyledContainer = styled.section`
  ${tw`mx-4`}
`;
const FormHeader = tw.h2`text-2xl font-bold`;
const StyledForm = tw.form`flex flex-col my-4`;
const AdditionalLinks = tw.div`flex flex-col`;
const StyledInput = styled.input`${tw`bg-bgDarker py-2 px-2 mb-4 rounded outline-none focus:(ring ring-main)`} 
  &::placeholder {
    color: ${theme`colors.main`}
  }
`;
const StyledButton = tw.button`bg-main text-white m-auto font-semibold w-max py-2 px-4 rounded`;
const NotificationMessage = styled.div`
  > i {
    ${tw`mr-2`}
  }
  ${tw`flex items-center px-4 py-2 mx-auto my-2 rounded w-max`}
  ${({ type }) => type === "error" && tw`font-semibold text-red-900 bg-red-300`}
  ${({ type }) =>
    type === "message" && tw`font-semibold text-green-900 bg-green-300`}
`;
const StyledLink = styled.a`
  ${({ type }) =>
    type === "magic"
      ? tw`my-4 text-main hover:border-highlight`
      : tw`text-main hover:border-highlight`}
  &::after {
    content: "→";
    ${tw`ml-1`}
  }
  ${tw`font-semibold transition duration-200 ease-in-out border-b-2 border-transparent cursor-pointer max-w-max`}
`;
const StyledDivider = tw.hr`my-2`;
const RegisterSection = tw.span`flex justify-between flex-wrap`;
