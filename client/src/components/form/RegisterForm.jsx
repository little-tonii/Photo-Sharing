import { Link } from "react-router-dom";
import { useRegister } from "../../contexts/RegisterContext";
import ButtonForm from "../button/ButtonForm";
import InputFieldForm from "../button/InputFieldForm";
import TextErrorValidation from "../button/TextErrorValidation";

function RegisterForm() {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
    updateEmail,
    updatePassword,
    updateConfirmPassword,
    updateFirstName,
    updateLastName,
    register,
  } = useRegister();

  return (
    <div className="showUpAnimation w-1/3 bg-white border-2 p-8 border-black rounded-lg">
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <InputFieldForm
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            handleOnChange={updateEmail}
          />
          {emailError ? (
            <TextErrorValidation>{emailError}</TextErrorValidation>
          ) : (
            ""
          )}
        </div>
        <div>
          <InputFieldForm
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            handleOnChange={updatePassword}
          />
          {passwordError ? (
            <TextErrorValidation>{passwordError}</TextErrorValidation>
          ) : (
            ""
          )}
        </div>
        <div>
          <InputFieldForm
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            handleOnChange={updateConfirmPassword}
          />
          {confirmPasswordError ? (
            <TextErrorValidation>{confirmPasswordError}</TextErrorValidation>
          ) : (
            ""
          )}
        </div>
        <div>
          <InputFieldForm
            name="firstName"
            id="firstName"
            type="text"
            placeholder="First name"
            value={firstName}
            handleOnChange={updateFirstName}
          />
          {firstNameError ? (
            <TextErrorValidation>{firstNameError}</TextErrorValidation>
          ) : (
            ""
          )}
        </div>
        <div>
          <InputFieldForm
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            handleOnChange={updateLastName}
          />
          {lastNameError ? (
            <TextErrorValidation>{lastNameError}</TextErrorValidation>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <ButtonForm text="Register" handleOnClick={register} />
      </div>
      <div className="text-sm text-gray-400 hover:text-gray-600 active:text-gray-600 text-center translate-y-1/2">
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
      </div>
    </div>
  );
}
export default RegisterForm;
