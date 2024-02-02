package com.private_lbs.taskmaster.member.domain.repository;

import com.private_lbs.taskmaster.member.domain.Member;
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

}
