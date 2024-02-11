import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimeLinePlayer from './TimeLinePlayer';
import { TeamTimeLine } from '@/api/type';
import calculateInning from '@/utils/calculateInning';

type TimeLine = {
    timeLine: TeamTimeLine;
};

export default function TimeLine({ timeLine }: TimeLine) {
    const timeLineEntries = Object.entries(timeLine);
    console.log(timeLineEntries);
    return (
        <Timeline position="alternate-reverse">
            {timeLineEntries.map(([key, data]) => {
                const [inning, type] = calculateInning(key);
                const dir = type === '초' ? 'left' : 'right';
                return (
                    <TimelineItem className={`timeline-item ${dir}`}>
                        <TimelineSeparator>
                            <TimelineDot className="dot" />
                            <TimelineConnector className="connector" />
                        </TimelineSeparator>
                        <TimelineContent className="content">
                            <h1 className="timeline-item-title">{inning}</h1>
                            <TimeLinePlayer />
                            <TimeLinePlayer />
                            <TimeLinePlayer />
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}
