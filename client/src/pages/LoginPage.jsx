import LoginForm from "../components/form/LoginForm";
import { LoginProvider } from "../contexts/LoginContext";
import LoginLayout from "../layouts/LoginLayout";

function LoginPage() {
  return (
    <LoginProvider>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </LoginProvider>
  );
}

export default LoginPage;
