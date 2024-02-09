package com.private_lbs.taskmaster.favorite.service;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.bat.domain.repository.BatRepository;
import com.private_lbs.taskmaster.favorite.data.dto.request.FavoriteRequest;
import com.private_lbs.taskmaster.favorite.data.dto.response.FavoriteProcessedVideo;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteQueryRepository;
import com.private_lbs.taskmaster.favorite.domain.repository.FavoriteRepository;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final MemberService memberService;
    private final FavoriteRepository favoriteRepository;
    private final BatRepository batRepository;
    private final FavoriteQueryRepository favoriteQueryRepository;

    @Transactional
    public void updateFavoriteStatus(FavoriteRequest favoriteRequest) {

        Member member = memberService.getCurrentMember();

        Bat bat = batRepository.findById(favoriteRequest.getBatId())
                .orElseThrow();

        Favorite favorite = new Favorite(member, bat);

        favoriteRepository
                .findLikeByMemberAndBat(favorite.getMember(), favorite.getBat())
                .ifPresentOrElse(Favorite::changeFavoriteStatus,
                        () -> {
                            favorite.changeFavoriteStatus();
                            favoriteRepository.save(favorite);
                        });
    }

    public List<FavoriteProcessedVideo> getLikeList() {
        Member member = memberService.getCurrentMember();
        return favoriteQueryRepository.findVideoLinkAndPlayerNameAndFavoriteByUserId(member.getId());
    }
}
