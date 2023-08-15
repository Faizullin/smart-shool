import * as React from "react";
import { IUpdateProfileProps } from "../../../models/IAuthUser";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUpdateProfile } from "../../../redux/store/reducers/userSlice";
import { FormattedMessage } from "react-intl";

interface IEditProfileFormProps {
}

const default_profile_image = 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200';

export default function EditProfileForm(_: IEditProfileFormProps) {
    const dispath = useAppDispatch()
    const { loading, errors, userData } = useAppSelector(state => state.user)
    const [data, setData] = React.useState<IUpdateProfileProps>({
        username: '',
        email: '',
    });
    const previewImage = React.useRef<string>(default_profile_image)
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleProfilePictureUpload = (event: React.ChangeEvent<any>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.current = reader.result as string
                setData(data => ({
                    ...data,
                    'profile_picture': file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleProfilePictureClick = (event: any) => {
        event.preventDefault()
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        if (data.profile_picture) {
            formData.append('profile_picture', data.profile_picture)
        }
        dispath(fetchUpdateProfile(formData)).then(response => {
            if (response.type === fetchUpdateProfile.fulfilled.toString()) {
                window.location.reload();
            }
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
        setData(data => ({
            ...data,
            [event.target.name]: event.target.value,
        }));
    }

    React.useEffect(() => {
        setData({
            username: userData.username,
            email: userData.email,
        })
        previewImage.current = userData.profile_picture || default_profile_image
    }, [userData])

    return (
        <form className="block md:flex mb-2"
            onSubmit={handleSubmit}>
            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                <div className="flex justify-between">
                    <span className="text-xl font-semibold block">
                        <FormattedMessage id="app.profile.label" />
                    </span>
                    <button disabled={loading}
                        type="submit" className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
                        <FormattedMessage id="app.edit.label" />
                    </button>
                </div>

                <span className="text-gray-600">This information is secret so be careful</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />
                <div className="w-full p-8 mx-2 flex justify-center">
                    <a className="max-w-xs w-32 items-center border" href="#" onClick={handleProfilePictureClick}>
                        <img
                            id="showImage"
                            className="cursor-pointer"
                            src={previewImage.current} alt="" />
                    </a>
                </div>
            </div>
            <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                <div className="rounded  shadow p-6">
                    <div className="pb-6">
                        <label htmlFor="profile-name" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id="app.auth.username.label" />
                        </label>
                        <div className="flex">
                            <input id="profile-name" type="text" autoComplete="on"
                                className="border-1  rounded-r px-4 py-2 w-full"
                                name='username' value={data.username} onChange={handleChange} />
                        </div>
                        {errors.username ? (
                            <p className="text-red-500 pt-2 italic">{errors.username}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id="app.required.label" />
                            </p>
                        )}
                    </div>
                    <div className="pb-4">
                        <label htmlFor="profile-email" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id="app.auth.email.label" />
                        </label>
                        <input id="profile-email" className="border-1 rounded-r px-4 py-2 w-full" type="email"
                            name='email' value={data.email} onChange={handleChange} />
                        {errors.email ? (
                            <p className="text-red-500 pt-2 italic">{errors.email}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id="app.required.label" />
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}