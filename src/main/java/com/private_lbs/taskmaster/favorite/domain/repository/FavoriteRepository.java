package com.private_lbs.taskmaster.favorite.domain.repository;

import com.private_lbs.taskmaster.bat.domain.Bat;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.favorite.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findLikeByMemberAndBat(Member member, Bat bat) ;
}
