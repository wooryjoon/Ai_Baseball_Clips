package com.private_lbs.taskmaster.favorite.service;

import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.FavoriteProcessedVideo;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteQueryRepository;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteRepository;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import com.private_lbs.taskmaster.processed_video.domain.repository.ProcessedVideoRepository;
import com.private_lbs.taskmaster.processed_video.exception.ProcessedVideoErrorCode;
import com.private_lbs.taskmaster.processed_video.exception.ProcessedVideoException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final MemberService memberService;
    private final FavoriteRepository favoriteRepository;
    private final ProcessedVideoRepository processedVideoRepository;
    private final FavoriteQueryRepository favoriteQueryRepository;

    @Transactional
    public void updateFavoriteStatus(FavoriteRequest favoriteRequest) {

        Member member = memberService.getCurrentMember();

        ProcessedVideo processedVideo = processedVideoRepository.findById(favoriteRequest.getProcessedVideoId())
                .orElseThrow(() -> new ProcessedVideoException(ProcessedVideoErrorCode.PROCESSED_VIDEO_IS_NOT_FOUNT));

        Favorite favorite = new Favorite(member, processedVideo);

        if (isLike(favorite.getMember(), favorite.getProcessedVideo())) {
            favorite.changeFavoriteStatus();
        } else {
            favorite.changeFavoriteStatus();
            favoriteRepository.save(favorite);
        }
    }

    public List<FavoriteProcessedVideo> getLikeList() {
        Member member = memberService.getCurrentMember();
        return favoriteQueryRepository.findVideoLinkAndPlayerNameAndFavoriteByUserId(member.getId());
    }

    public boolean isLike(Member member, ProcessedVideo processedVideo) {
        return favoriteRepository.findLikeByMemberAndProcessedVideo(member, processedVideo).isPresent();
    }
}
