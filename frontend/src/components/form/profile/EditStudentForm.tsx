import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IUpdateStudentProps } from '../../../models/IStudent';
import { fetchUpdateProfile } from '../../../redux/store/reducers/studentSlice';
import { FormattedMessage } from 'react-intl';

export interface IEditStudentFormProps {
}

export default function EditStudentForm(_: IEditStudentFormProps) {
    const dispath = useAppDispatch()
    const { loading, errors, student_payload } = useAppSelector(state => state.student)
    const [data, setData] = React.useState<IUpdateStudentProps>({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        parent_mobile_number: '',
        address: '',
        others: ''
    });

    const handleChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispath(fetchUpdateProfile({ ...data }))
            .then(response => {
                if (response.type === fetchUpdateProfile.fulfilled.toString()) {
                    window.location.reload();
                }
            })
    }


    React.useEffect(() => {
        if (student_payload) {
            setData({
                first_name: student_payload.first_name || '',
                last_name: student_payload.last_name || '',
                gender: student_payload.gender || '',
                date_of_birth: student_payload.date_of_birth || '',
                parent_mobile_number: student_payload.parent_mobile_number || '',
                address: student_payload.address || '',
                others: student_payload.others || '',
            })
        }

    }, [student_payload])
    return (
        <form id="student-form" className="block"
            onSubmit={handleSubmit}>
            <div className="w-full p-8 bg-white shadow-md">
                <div className="rounded shadow p-6">
                    <div className="pb-6">
                        <label htmlFor="student-first_name" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.first_name.label' />
                        </label>
                        <div className="flex">
                            <input
                                id="student-first_name"
                                type="text"
                                autoComplete="on"
                                className="border-1 rounded-r px-4 py-2 w-full"
                                name='first_name'
                                value={data.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.first_name ? (
                            <p className="text-red-500 pt-2 italic">{errors.first_name}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.required.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="student-last_name" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.last_name.label' />
                        </label>
                        <input
                            id="student-last_name"
                            className="border-1 rounded-r px-4 py-2 w-full"
                            type="text"
                            name='last_name'
                            value={data.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name ? (
                            <p className="text-red-500 pt-2 italic">{errors.last_name}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.required.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="student-gender" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.gender.label' />
                        </label>
                        <select
                            id="student-gender"
                            className="border-1 rounded-r px-4 py-2 w-full"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <option value="">---</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender ? (
                            <p className="text-red-500 pt-2 italic">{errors.gender}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.required.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="student-date_of_birth" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.date_of_birth.label' />
                        </label>
                        <input
                            id="student-date_of_birth "
                            className="border-1 rounded-r px-4 py-2 w-full"
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            onChange={handleChange}
                        />
                        {errors.date_of_birth ? (
                            <p className="text-red-500 pt-2 italic">{errors.date_of_birth}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.required.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="profile-parent-mobile" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.contact_no.label' />
                        </label>
                        <input
                            id="profile-parent-mobile"
                            className="border-1 rounded-r px-4 py-2 w-full"
                            type="text"
                            name="parent_mobile_number"
                            value={data.parent_mobile_number}
                            onChange={handleChange}
                        />
                        {errors.parent_mobile_number ? (
                            <p className="text-red-500 pt-2 italic">{errors.parent_mobile_number}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.optional.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="profile-address" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.current_address.label' />
                        </label>
                        <textarea
                            id="profile-address"
                            className="border-1 rounded-r px-4 py-2 w-full"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                        ></textarea>
                        {errors.address ? (
                            <p className="text-red-500 pt-2 italic">{errors.address}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.optional.label' />
                            </p>
                        )}
                    </div>

                    <div className="pb-4">
                        <label htmlFor="profile-others" className="font-semibold text-gray-700 block pb-1">
                            <FormattedMessage id='app.dashboard.student_data.others.label' />
                        </label>
                        <textarea
                            id="profile-others"
                            className="border-1 rounded-r px-4 py-2 w-full"
                            name="others"
                            value={data.others}
                            onChange={handleChange}
                        ></textarea>
                        {errors.others ? (
                            <p className="text-red-500 pt-2 italic">{errors.others}</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">
                                <FormattedMessage id='app.optional.label' />
                            </p>
                        )}
                    </div>

                    <button disabled={loading} type="submit"
                        className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer">
                        <FormattedMessage id='app.submit.label' />
                    </button>
                </div>
            </div>
        </form>
    );
}
