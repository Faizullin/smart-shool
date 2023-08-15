import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../redux/store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import PrimaryButton from './PrimaryButton';
import TextInput from './TextInput';
import InputError from './InputError';
import InputLabel from '../../InputLabel';
import { ILoginProps } from '../../../models/IAuthUser';
import { FormattedMessage, useIntl } from 'react-intl';

export interface ILoginFormProps {
}

export default function LoginForm() {
  const dispath = useAppDispatch()
  const navigate = useNavigate()
  const intl = useIntl()
  const { errors, loading, } = useAppSelector(state => state.auth)
  const [data, setData] = React.useState<ILoginProps>({
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData(state => ({
      ...state,
      [name]: value
    } as Pick<ILoginProps, keyof ILoginProps>));
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(loginUser(data)).then((response) => {
      if (response.type === loginUser.fulfilled.toString()) {
        navigate('/article')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel htmlFor="email" value={intl.formatMessage({
          id: 'app.auth.email.label'
        })} />
        <TextInput
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          autoComplete="email"
          isFocused={true}
          onChange={handleInputChange}
        />
        <InputError message={errors.email} className="mt-2" />
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="password" value={intl.formatMessage({
          id: 'app.auth.password.label'
        })} />
        <TextInput
          type="password"
          name="password"
          value={data.password}
          className="mt-1 block w-full"
          autoComplete="password"
          onChange={handleInputChange}
        />

        <InputError message={errors.password} className="mt-2" />
      </div>

      <div className="flex justify-between mt-4">
        {/* <label className="flex items-center">
                <CheckboxInput name="remember" value={data.remember} onChange={(e) => void} />

                <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label> */}
        <Link
          to="/auth/forgot_password"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          <FormattedMessage id="app.auth.login.forgot_password.label" />
        </Link>
        <Link
          to="/face_id/login"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          <FormattedMessage id="app.auth.login.via_face_id.label" />
        </Link>
      </div>
      <InputError message={errors.detail} className="my-4" />
      <PrimaryButton className="mt-6" processing={loading}>
        <FormattedMessage id='app.auth.login.submit.label' />
      </PrimaryButton>
      <p className="mt-3 text-sm">
        <FormattedMessage id='app.auth.login.not_member.label' />
        <Link to="/auth/register">
          <FormattedMessage id='app.auth.login.create_account.label' />
        </Link>
      </p>
    </form>
  );
}
