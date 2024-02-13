import { ProcessedVideoByInnings } from '@/api/type';
import Content from '@/components/Content';
import React from 'react';

type ContentArticle = {
    clip: ProcessedVideoByInnings;
};

export default function ContentArticle({ clip }: ContentArticle) {
    return (
        <div className="contentArticle">
            <Content
                clip={{
                    batId: clip.batId,
                    processedVideoUrl: clip.processedVideoUrl,
                    pitcherName: clip.pitcherName,
                    favorite: clip.favorite,
                }}
            />
            <span className="contentArticle-title">
                {clip.inning} (vs{clip.pitcherName})
            </span>
        </div>
    );
}
