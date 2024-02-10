import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimeLinePlayer from './TimeLinePlayer';

export default function TimeLine() {
    return (
        <Timeline position="alternate-reverse">
            <TimelineItem className="timeline-item left">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                    <TimelineConnector className="connector" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
            <TimelineItem className="timeline-item right">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
            <TimelineItem className="timeline-item left">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                    <TimelineConnector className="connector" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
            <TimelineItem className="timeline-item right">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
            <TimelineItem className="timeline-item left">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                    <TimelineConnector className="connector" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
            <TimelineItem className="timeline-item right">
                <TimelineSeparator>
                    <TimelineDot className="dot" />
                </TimelineSeparator>
                <TimelineContent className="content">
                    <h1 className="timeline-item-title">1회초</h1>
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                    <TimeLinePlayer />
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}
