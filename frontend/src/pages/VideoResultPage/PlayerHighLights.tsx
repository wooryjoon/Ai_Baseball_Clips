import PlayerVideoCard from './PlayerVideoCard';

export default function PlayerHighlights() {
    const DUMMY_DATA = [
        {
            name: '손현조',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '우창진',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '함승찬',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '손현조',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '우창진',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '함승찬',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '손현조',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '우창진',
            url: ['', '', '', '', '', '', ''],
        },
        {
            name: '함승찬',
            url: ['', '', '', '', '', '', ''],
        },
    ];
    return (
        <>
            {DUMMY_DATA.map((player_data) => {
                return <PlayerVideoCard playerData={player_data} />;
            })}
        </>
    );
}
