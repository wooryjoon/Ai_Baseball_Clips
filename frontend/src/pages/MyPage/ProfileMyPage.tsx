import { requestUserInfo } from '@/api/requestMyPage';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';

type Props = {};

export default function ProfileMyPage({}: Props) {
    const { data, isLoading, isError } = useQuery({
        queryFn: requestUserInfo,
        queryKey: ['UserInfo'],
    });
    if (isLoading) return <Loading />;
    if (data?.data)
        return (
            <div className="myProfile">
                <div className="profile-img-container">
                    <FontAwesomeIcon className="user" icon={faUser} />
                </div>
                <div className="profile-info-container">
                    <div className="profile-email">{data.data.email}</div>
                </div>
                <Button styleType="modify">정보 수정</Button>
            </div>
        );
}
