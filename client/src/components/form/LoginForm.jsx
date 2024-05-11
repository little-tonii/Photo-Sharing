import { Link } from "react-router-dom";
import InputFieldForm from "../button/InputFieldForm";
import ButtonForm from "../button/ButtonForm";
import { useLogin } from "../../contexts/LoginContext";

function LoginForm() {
  const {
    email,
    password,
    updateEmail,
    updatePassword,
    login,
    error,
    register,
  } = useLogin();

  return (
    <div className="showUpAnimation w-1/3 bg-white border-2 p-8 border-black rounded-lg">
      <div className="flex flex-col gap-4 mb-2">
        <InputFieldForm
          name="email"
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          handleOnChange={updateEmail}
        />
        <InputFieldForm
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          handleOnChange={updatePassword}
        />
      </div>
      <div className="mb-8">
        <Link
          className="text-sm text-gray-400 hover:text-gray-600 active:text-gray-600 text-right"
          to="/forgot-password"
        >
          <p>Forgot password?</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <ButtonForm text="Login" handleOnClick={login} />
        <ButtonForm text="Register" handleOnClick={register} />
      </div>
      {error ? (
        <div className="text-red-500 text-sm text-center translate-y-2">
          <p>{error}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LoginForm;
