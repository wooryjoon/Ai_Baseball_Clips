package com.private_lbs.taskmaster.favorite.service;

import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteCancelRequest;
import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.ProcessedVideoFavorite;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteRepository;
import com.private_lbs.taskmaster.favorite.exception.FavoriteErrorCode;
import com.private_lbs.taskmaster.favorite.exception.FavoriteException;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import com.private_lbs.taskmaster.processed_video.domain.repository.ProcessedVideoRepository;
import com.private_lbs.taskmaster.processed_video.exception.ProcessedVideoErrorCode;
import com.private_lbs.taskmaster.processed_video.exception.ProcessedVideoException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final MemberService memberService;
    private final FavoriteRepository favoriteRepository;
    private final ProcessedVideoRepository processedVideoRepository;

    @Transactional
    public void like(FavoriteRequest likeRequest) {

        Member member = memberService.getCurrentMember();

        ProcessedVideo processedVideo = processedVideoRepository.findById(likeRequest.getProcessedVideoId())
                .orElseThrow(() -> new ProcessedVideoException(ProcessedVideoErrorCode.PROCESSED_VIDEO_IS_NOT_FOUNT));

        Favorite favorite = new Favorite(member, processedVideo);

        if (isLike(favorite.getMember(), favorite.getProcessedVideo())) {
            throw new FavoriteException(FavoriteErrorCode.IS_ALREADY_FAVORITE);
        }

        favoriteRepository.save(favorite);
    }

    @Transactional
    public void dislike(FavoriteCancelRequest dislikeRequest) {
        Member member = memberService.getCurrentMember();
        ProcessedVideo processedVideo = processedVideoRepository.findById(dislikeRequest.getProcessedVideoId())
                .orElseThrow(() -> new ProcessedVideoException(ProcessedVideoErrorCode.PROCESSED_VIDEO_IS_NOT_FOUNT));

        Favorite favorite = favoriteRepository.findLikeByMemberAndProcessedVideo(member, processedVideo)
                .orElseThrow(() -> new ProcessedVideoException(FavoriteErrorCode.IS_ALREADY_NOT_FAVORITE));

        favoriteRepository.delete(favorite);
    }

    public List<ProcessedVideoFavorite> getLikeList() {

        List<ProcessedVideoFavorite> processedVideoLikelist = new ArrayList<>();

        Member member = memberService.getCurrentMember();

        List<Favorite> favorites = member.getFavorites();
        for (Favorite favorite : favorites) {
            ProcessedVideo processedVideo = favorite.getProcessedVideo();
            processedVideoLikelist.add(ProcessedVideoFavorite.builder()
                    .processedVideoUrl(processedVideo.getProcessedVideoUrl())
                    .playerName(processedVideo.getPlayer().getName())
                    .isLike(true)
                    .build());
        }
        return processedVideoLikelist;
    }

    public boolean isLike(Member member, ProcessedVideo processedVideo) {
        return favoriteRepository.findLikeByMemberAndProcessedVideo(member, processedVideo).isPresent();
    }
}
