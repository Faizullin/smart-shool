import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IChangePasswordProps } from "../../../models/IAuthUser";
import { fetchChangePassword } from "../../../redux/store/reducers/userSlice";
import { FormattedMessage } from "react-intl";

interface IEditPasswordFormProps {
}

export default function EditPasswordForm(_: IEditPasswordFormProps) {
    const dispath = useAppDispatch()
    const { loading, errors } = useAppSelector(state => state.user)
    const [data, setData] = React.useState<IChangePasswordProps>({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispath(fetchChangePassword(data)).then(response => {
            if (response.type === fetchChangePassword.fulfilled.toString()) {
                window.location.reload()
            }
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div className="w-full bg-white shadow-md">
            <form className="rounded  shadow p-6"
                onSubmit={handleSubmit}>
                <div className="pb-6">
                    <label htmlFor="old_password" className="font-semibold text-gray-700 block pb-1">
                        <FormattedMessage id="app.dashboard.update_password.current_password.label" />
                    </label>
                    <div className="flex">
                        <input id="old_password" type="password" autoComplete="password"
                            className="border-1 rounded-r px-4 py-2 w-full" name="old_password"
                            onChange={handleChange} value={data.old_password} />
                    </div>
                    {errors.old_password ? (
                        <p className="text-red-500 pt-2 italic">{errors.old_password}</p>
                    ) : (
                        <p className="text-gray-600 pt-2 block opacity-70">
                            <FormattedMessage id="app.required.label" />
                        </p>
                    )}
                </div>
                <div className="pb-4">
                    <label htmlFor="new_password" className="font-semibold text-gray-700 block pb-1">
                        <FormattedMessage id="app.dashboard.update_password.new_password.label" />
                    </label>
                    <input id="new_password" type="password" className="border-1 rounded-r px-4 py-2 w-full" required
                        name="new_password" onChange={handleChange} value={data.new_password} />
                    {errors.new_password ? (
                        <p className="text-red-500 pt-2 italic">{errors.new_password}</p>
                    ) : (
                        <p className="text-gray-600 pt-2 block opacity-70">
                            <FormattedMessage id="app.required.label" />
                        </p>
                    )}
                </div>
                <div className="pb-4">
                    <label htmlFor="new_password_confirmation" className="font-semibold text-gray-700 block pb-1">
                        <FormattedMessage id="app.dashboard.update_password.confirm_password.label" />
                    </label>
                    <input id="new_password_confirmation" type="password" className="border-1 rounded-r px-4 py-2 w-full"
                        name="new_password_confirmation" onChange={handleChange} value={data.new_password_confirmation} />
                    {errors.new_password_confirmation ? (
                        <p className="text-red-500 pt-2 italic">{errors.new_password_confirmation}</p>
                    ) : (
                        <p className="text-gray-600 pt-2 block opacity-70">
                            <FormattedMessage id="app.required.label" />
                        </p>
                    )}
                </div>
                <button disabled={loading} type="submit"
                    className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer">
                    <FormattedMessage id="app.submit.label" />
                </button>
            </form>
        </div>
    );
}