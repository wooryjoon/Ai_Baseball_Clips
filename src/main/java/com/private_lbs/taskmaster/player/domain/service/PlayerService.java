package com.private_lbs.taskmaster.player.domain.service;

import com.private_lbs.taskmaster.player.domain.Player;
import com.private_lbs.taskmaster.player.domain.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    public List<Player> getPlayerFromRequest(long request) {
        return playerRepository.findPlayerByRequestId(request);
    }

}
