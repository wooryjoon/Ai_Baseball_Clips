package com.private_lbs.taskmaster.member.repository;

import com.private_lbs.taskmaster.member.dto.LoginRequest;
import com.private_lbs.taskmaster.member.entity.Member;
import com.private_lbs.taskmaster.member.entity.RefreshToken;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    // 로그인
    @Transactional
    public Optional<Member> findByEmailAndPassword(LoginRequest loginMemberRequest) {
        String jpql = "SELECT m From Member m WHERE m.email = :email and m.password = :password";
        List<Member> members = em.createQuery(jpql, Member.class)
                .setParameter("email", loginMemberRequest.getEmail())
                .setParameter("password", loginMemberRequest.getPassword())
                .getResultList();
        return members.stream().findAny();
    }

    public Member findById(Long id) {
        return em.find(Member.class, id);
    }

    @Transactional
    public Optional<Member> findByEmail(String email) {
        System.out.println(email);
        String jpql = "SELECT m From Member m WHERE m.email = :email";
        List<Member> members = em.createQuery(jpql, Member.class)
                .setParameter("email", email)
                .getResultList();
        return members.stream().findAny();
    }

    @Transactional
    public void saveRefreshToken(Member member, String refreshToken) {
        RefreshToken newRefreshToken = new RefreshToken().toEntity(member, refreshToken);
        em.persist(newRefreshToken);
    }

    @Transactional
    public Optional<RefreshToken> getRefreshToken(Member member) {
        String jpql = "SELECT r From RefreshToken r WHERE r.member = :member";

        List<RefreshToken> refreshTokens = em.createQuery(jpql, RefreshToken.class)
                .setParameter("member", member)
                .getResultList();
        return refreshTokens.stream().findAny();
    }

    @Transactional
    public void deleteRefreshToken(Member loginMember) {
        String jpql = "Delete FROM RefreshToken r WHERE r.member.id = :memberId";
        em.createQuery(jpql)
                .setParameter("memberId", loginMember.getId())
                .executeUpdate();
    }
}
