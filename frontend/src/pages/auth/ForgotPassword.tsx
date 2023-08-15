import AuthLayout from '../../components/layouts/AuthLayout';
import ForgotPasswordForm from '../../components/form/auth/ForgotPasswordForm';
import { FormattedMessage } from 'react-intl';

interface IForgotPasswordProps {
    status?: string
}

export default function ForgotPassword({ status }: IForgotPasswordProps) {
    return (
        <AuthLayout>
            {/* <Head title="Forgot Password" /> */}
            <div className="mb-4 text-sm text-gray-500 leading-normal">
                <FormattedMessage
                    id='app.auth.forgot_password.info.label' />
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <ForgotPasswordForm />
        </AuthLayout>
    );
}