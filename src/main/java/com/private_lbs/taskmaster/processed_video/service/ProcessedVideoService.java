package com.private_lbs.taskmaster.processed_video.service;

import com.private_lbs.taskmaster.player.domain.Player;
import com.private_lbs.taskmaster.player.domain.service.PlayerService;
import com.private_lbs.taskmaster.processed_video.data.dto.response.ProcessedVideoFromPlayer;
import com.private_lbs.taskmaster.processed_video.domain.repository.ProcessedVideoQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProcessedVideoService {

    private final PlayerService playerService;
    private final ProcessedVideoQueryRepository processedVideoQueryRepository;

    public List<ProcessedVideoFromPlayer> getPlayerProcessedVideo(Long request) {
        // 요청에 따른 선수들 list
        List<Player> players = playerService.getPlayerFromRequest(request);
        // 선수 별 영상들을 담는 dto
        List<ProcessedVideoFromPlayer> processedVideosFromPlayers = new ArrayList<>();
        // 선수별 for 문
        for (Player player : players) {
            processedVideosFromPlayers.add(ProcessedVideoFromPlayer
                    .builder()
                    .playerName(player.getName())
                    .processedVideoResponses(processedVideoQueryRepository.
                            findVideosAndFavoritesByPlayerOrderByCreateDateTime(player.getId()))
                    .build());
        }
        return processedVideosFromPlayers;
    }
}
