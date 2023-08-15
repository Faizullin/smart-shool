import LoginForm from '../../components/form/auth/LoginForm';
import AuthLayout from '../../components/layouts/AuthLayout';

interface ILoginProps {
    status?: boolean
}

export default function Login (props: ILoginProps) {
    return (
        <AuthLayout>
            {/* <Head title="Log in" /> */}
            { props.status && <div className="mb-4 font-medium text-sm text-green-600">{ props.status }</div>}
            <LoginForm />
        </AuthLayout>
    );
}
