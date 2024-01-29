package com.private_lbs.taskmaster.member.service;

import com.private_lbs.taskmaster.global.response.MemberResponse;
import com.private_lbs.taskmaster.member.dto.JoinMemberRequest;
import com.private_lbs.taskmaster.member.dto.LoginRequest;
import com.private_lbs.taskmaster.member.entity.Member;
import com.private_lbs.taskmaster.member.entity.RefreshToken;
import com.private_lbs.taskmaster.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMemberOrThrow(Long id) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("id가 일치하는 회원이 없습니다");
        }
        return member;
    }

    @Transactional
    public MemberResponse join(JoinMemberRequest joinMemberRequest) {
        // joinMemberRequest -> Member
        Member member = new Member(joinMemberRequest.getEmail(), joinMemberRequest.getPassword());
        memberRepository.save(member);
        return MemberResponse.toResponse(member);
    }

    public boolean isEmailAvailable(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.isEmpty();
    }

    public Optional<Member> isMember(LoginRequest loginRequest) {
        return memberRepository.findByEmailAndPassword(loginRequest);
    }

    public void saveRefreshToken(Member member, String refreshToken) {
        memberRepository.saveRefreshToken(member, refreshToken);
    }

    public boolean isRefreshToken(Member member, String refreshToken) {
        Optional<RefreshToken> findRefreshToken = memberRepository.getRefreshToken(member);
        return findRefreshToken.map(token -> token.getRefreshToken().equals(refreshToken)).orElse(false);
    }

    public void deleteRefreshToken(Member loginMember) {
        memberRepository.deleteRefreshToken(loginMember);
    }
}
