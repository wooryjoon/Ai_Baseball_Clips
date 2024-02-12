import { useState } from 'react';
import TeamSelectBar from './TeamSelectBar';
import HighlightContainer from './HighlightContainer';
import { useQuery } from '@tanstack/react-query';
import { requestTeamInfo } from '@/api/requestReportView';
import { SelectedTeam } from '../VideoResultOverview/VideoResultOverview';

export default function PlayerHighLights() {
    // api : 팀 정보는 페이지 레이어에서 받아온다. 선수별 정보는 하이라이트 컴포넌트에서 받아온다.
    //그리고 전체 페이지 단에서 state로 팀을 관리한다.

    const { data, isLoading, isError } = useQuery({
        queryFn: requestTeamInfo,
        queryKey: ['teamInfo'],
    });
    const [currentTeam, setCurrentTeam] = useState<SelectedTeam>('firstTeam');
    const onClickChangeTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget instanceof HTMLElement) {
            if (currentTeam === 'firstTeam' && e.currentTarget.classList.contains('firstTeam'))
                return;
            else if (
                currentTeam === 'secondTeam' &&
                e.currentTarget.classList.contains('secondTeam')
            )
                return;
            setCurrentTeam((prev: SelectedTeam) => {
                if (prev === 'firstTeam') return 'secondTeam';
                else return 'firstTeam';
            });
        }
    };
    if (data?.data)
        return (
            <>
                <TeamSelectBar
                    teamData={data.data}
                    currentTeam={currentTeam}
                    onClick={onClickChangeTeam}
                />
                <HighlightContainer team={currentTeam} />
            </>
        );
}
