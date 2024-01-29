import { useRef } from 'react';
import ProfileDialog from './ProfileDialog';
import openDialog from '@/utils/openDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function ProfileWidget() {
    const profileDialogRef = useRef<HTMLDialogElement>(null);
    return (
        <div className="profile-container">
            <FontAwesomeIcon
                icon={faBars}
                className="profile-img"
                onClick={() => {
                    openDialog(profileDialogRef);
                }}
            />
            <ProfileDialog dialogRef={profileDialogRef} />
        </div>
    );
}
