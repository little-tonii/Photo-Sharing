import RegisterForm from "../components/form/RegisterForm";
import { RegisterProvider } from "../contexts/RegisterContext";
import LoginLayout from "../layouts/LoginLayout";

function RegisterPage() {
  return (
    <RegisterProvider>
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    </RegisterProvider>
  );
}

export default RegisterPage;
