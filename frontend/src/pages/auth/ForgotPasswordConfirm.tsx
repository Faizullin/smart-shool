import AuthLayout from '../../components/layouts/AuthLayout'
import ForgotPasswordConfirmForm from '../../components/form/auth/ForgotPasswordConfirmForm'
import { FormattedMessage } from 'react-intl'

type Props = {}

const ForgotPasswordConfirm = (_: Props) => {
  return (
    <AuthLayout>
      <div className="mb-4 text-sm text-gray-600">
        <FormattedMessage
          id='app.auth.forgot_password.info.label' />
      </div>
      <ForgotPasswordConfirmForm />
    </AuthLayout>
  )
}

export default ForgotPasswordConfirm