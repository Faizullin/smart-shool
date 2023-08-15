import React from 'react'
import TextInput from './TextInput'
import InputError from './InputError'
import PrimaryButton from './PrimaryButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IForgotPasswordProps } from '../../../models/IAuthUser'
import { forgotUserPassword } from '../../../redux/store/reducers/authSlice'
import InputLabel from '../../InputLabel'
import { FormattedMessage, useIntl } from 'react-intl'

type Props = {}

const ForgotPasswordForm = (_: Props) => {
    const dispath = useAppDispatch()
    const intl = useIntl()
    const { loading, errors } = useAppSelector(state => state.auth)
    const [data, setData] = React.useState<IForgotPasswordProps>({
        email: '',
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData(state => ({
            ...state,
            [name]: value
        } as Pick<IForgotPasswordProps, keyof IForgotPasswordProps>));
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispath(forgotUserPassword(data))
    }
    return (
        <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="email" value={intl.formatMessage({ id: 'app.auth.email.label' })} />
            <TextInput
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={handleInputChange}
            />

            <InputError messages={errors.email} className="mt-2" />

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" processing={loading}>
                    <FormattedMessage
                        id='app.auth.forgot_password.submit.label' />
                </PrimaryButton>
            </div>
        </form>
    )
}

export default ForgotPasswordForm