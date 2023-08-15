import DashboardLayout from '../../../components/layouts/DashboardLayout';
import EditProfileForm from '../../../components/form/profile/EditProfileForm';
import EditPasswordForm from '../../../components/form/profile/EditPasswordForm';
import EditStudentForm from '../../../components/form/profile/EditStudentForm';

interface IProfileEditProps {
}

export default function ProfileEdit (_: IProfileEditProps) {
    return (
        <DashboardLayout>
            <EditProfileForm />
            <EditPasswordForm />
            <EditStudentForm />
        </DashboardLayout>
    );
}
