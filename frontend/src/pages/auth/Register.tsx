import RegisterForm from '../../components/form/auth/RegisterForm';
import AuthLayout from '../../components/layouts/AuthLayout';

interface IRegisterProps {
}

export default function Register (_: IRegisterProps) {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}
