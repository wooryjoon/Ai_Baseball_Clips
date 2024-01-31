package com.private_lbs.taskmaster.member.repository;

import com.private_lbs.taskmaster.member.entity.Member;
import com.private_lbs.taskmaster.member.entity.RefreshToken;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MemberRepository {

    @PersistenceContext
    EntityManager em;
    // 회원가입
    public void save(Member member) {
        em.persist(member);
    }

    public Optional<Member> findByEmail(String email) {
        String jpql = "SELECT m From Member m WHERE m.email = :email";
        List<Member> members = em.createQuery(jpql, Member.class)
                .setParameter("email", email)
                .getResultList();
        return members.stream().findAny();
    }

    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(em.find(Member.class, id));
    }

    public void saveRefreshToken(Member member, String refreshToken) {
//        RefreshToken newRefreshToken = new RefreshToken().toEntity(member, refreshToken);
//        em.persist(newRefreshToken);
    }

    public Optional<RefreshToken> getRefreshToken(Member member) {
        String jpql = "SELECT r From RefreshToken r WHERE r.member = :member";

        List<RefreshToken> refreshTokens = em.createQuery(jpql, RefreshToken.class)
                .setParameter("member", member)
                .getResultList();
        return refreshTokens.stream().findAny();
    }

    public void deleteRefreshToken(Member loginMember) {
        String jpql = "Delete FROM RefreshToken r WHERE r.member.id = :memberId";
        em.createQuery(jpql)
                .setParameter("memberId", loginMember.getId())
                .executeUpdate();
    }
}
