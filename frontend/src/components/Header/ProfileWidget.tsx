import { useRef } from 'react';
import ProfileDialog from './ProfileDialog';
import openDialog from '@/utils/openDialog';

export default function ProfileWidget() {
    const profileDialogRef = useRef<HTMLDialogElement>(null);
    return (
        <div className="profile-container">
            <button
                className="profile-img"
                onClick={() => {
                    openDialog(profileDialogRef);
                }}
            ></button>
            <ProfileDialog dialogRef={profileDialogRef} />
        </div>
    );
}
