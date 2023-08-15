import React from 'react';
import TextInput from './TextInput';
import InputLabel from '../../InputLabel';
import PrimaryButton from './PrimaryButton';
import { IForgotPasswordConfirmProps } from '../../../models/IAuthUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { forgotUserPasswordConfirm } from '../../../redux/store/reducers/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputError from './InputError';

export default function ForgotPasswordConfirmForm() {
    const dispath = useAppDispatch()
    const navigate = useNavigate()
    const { errors, loading,} = useAppSelector(state => state.auth)
    const [data,setData] = React.useState<IForgotPasswordConfirmProps>({
        password: '',
        token: '',
    })
    const [searchParams, _] = useSearchParams();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData(state => ({
          ...state,
          [name]: value
        } as Pick<IForgotPasswordConfirmProps, keyof IForgotPasswordConfirmProps>));
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispath(forgotUserPasswordConfirm(data)).then((response) => {
          if(response.type === forgotUserPasswordConfirm.fulfilled.toString()) {
            navigate('/auth/login')
          }
        })
    }
    
    React.useEffect(() => {
        const token = searchParams.get('token')
        if(token) {
            setData(data => ({
                ...data,
                token,
            }))
        }
    }, [searchParams])

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />

                <TextInput
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleInputChange}
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" processing={loading}>
                    Confirm
                </PrimaryButton>
            </div>
        </form>
    );
}