package com.private_lbs.taskmaster.processed_video.service;

import com.private_lbs.taskmaster.favorite.service.FavoriteService;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import com.private_lbs.taskmaster.player.domain.Player;
import com.private_lbs.taskmaster.player.domain.service.PlayerService;
import com.private_lbs.taskmaster.processed_video.data.dto.response.ProcessedVideoFromPlayer;
import com.private_lbs.taskmaster.processed_video.data.dto.response.ProcessedVideoResponse;
import com.private_lbs.taskmaster.processed_video.domain.ProcessedVideo;
import com.private_lbs.taskmaster.processed_video.domain.repository.ProcessedVideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcessedVideoService {

    private final PlayerService playerService;
    private final MemberService memberService;
    private final FavoriteService favoriteService;
    private final ProcessedVideoRepository processedVideoRepository;

    public List<ProcessedVideoFromPlayer> getPlayerProcessedVideo(Long request) {
        Member member = memberService.getCurrentMember();
        List<Player> players = playerService.getPlayerFromRequest(request);
        List<ProcessedVideoFromPlayer> processedVideoFromPlayers = new ArrayList<>();
        for (Player player : players) {
            List<ProcessedVideo> processedVideoListByPlayers
                    = processedVideoRepository.findProcessedVideoListByPlayer(player);

            processedVideoFromPlayers.add(ProcessedVideoFromPlayer.builder()
                    .playerName(player.getName())
                    .processedVideoResponses(processedVideoListByPlayers.stream()
                            .map(processedVideo ->
                                    new ProcessedVideoResponse(processedVideo.getProcessedVideoUrl(), processedVideo.getId()
                                            , favoriteService.isLike(member, processedVideo)))
                            .toList())
                    .build());
        }
        return processedVideoFromPlayers;
    }
}
