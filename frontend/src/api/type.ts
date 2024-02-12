// 로그인
interface LoginResponseData {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
}

interface FailResponse {
    message: string;
    errorCode: 'MEMBER_05' | 'MEMBER_04' | 'MEMBER_02';
}

// 팀 정보 response
interface TeamInfo {
    firstTeamName: string;
    firstTeamImageUrl: string;
    secondTeamName: string;
    secondTeamImageUrl: string;
}

// 팀 선발 라인업 response
interface PlayerLineUp {
    hitterId: string;
    name: string;
    position: string;
    playerImage: string;
}
interface TeamLineUp {
    firstTeam: PlayerLineUp[];
    secondTeam: PlayerLineUp[];
}

// 출전 선수 타임라인 response
interface PlayerTimeLine {
    name: string;
    imageUrl: string;
}
interface TeamTimeLine {
    '1'?: PlayerTimeLine[];
    '2'?: PlayerTimeLine[];
    '3'?: PlayerTimeLine[];
    '4'?: PlayerTimeLine[];
    '5'?: PlayerTimeLine[];
    '6'?: PlayerTimeLine[];
    '7'?: PlayerTimeLine[];
    '8'?: PlayerTimeLine[];
    '9'?: PlayerTimeLine[];
}

// 야구장 포지션 선수 response
interface TeamInfoFilteredByInnings {
    firstTeam: PlayerInfoFilteredByInnings[];
    secondTeam: PlayerInfoFilteredByInnings[];
}
interface PlayerInfoFilteredByInnings {
    name: string;
    position: string;
    imageUrl: string;
    processedVideoByInnings: ProcessedVideoByInnings[];
}
interface ProcessedVideoByInnings {
    processedVideoUrl: string;
    pitcherName: string;
    isFavorite: boolean;
}

export type {
    LoginResponseData,
    FailResponse,
    TeamInfo,
    TeamLineUp,
    TeamTimeLine,
    PlayerLineUp,
    PlayerTimeLine,
    TeamInfoFilteredByInnings,
    PlayerInfoFilteredByInnings,
    ProcessedVideoByInnings,
};
