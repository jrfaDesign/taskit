import LoginForm from "./_components/LoginForm";
import SocialLogin from "./_components/SocialLogin";

const LoginPage = () => {
  return (
    <div>
      <div className="mb-4">
        <h5 className="text-3xl font-bold">Hi, Welcome! 👋</h5>
      </div>
      <SocialLogin />

      <LoginForm />
    </div>
  );
};

export default LoginPage;
