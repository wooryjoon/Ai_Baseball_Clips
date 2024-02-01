package com.private_lbs.taskmaster.member.service;

import com.private_lbs.taskmaster.global.auth.Authentication;
import com.private_lbs.taskmaster.global.auth.AuthenticationContextHolder;
import com.private_lbs.taskmaster.global.util.JWTUtil;
import com.private_lbs.taskmaster.member.data.dto.request.JoinMemberRequest;
import com.private_lbs.taskmaster.member.data.dto.request.LoginRequest;
import com.private_lbs.taskmaster.member.data.dto.request.MemberLogoutRequest;
import com.private_lbs.taskmaster.member.data.dto.response.MemberLoginResponse;
import com.private_lbs.taskmaster.member.data.dto.response.MemberResponse;
import com.private_lbs.taskmaster.member.data.vo.JwtToken;
import com.private_lbs.taskmaster.member.entity.Member;
import com.private_lbs.taskmaster.member.entity.RefreshToken;
import com.private_lbs.taskmaster.member.exception.MemberErrorCode;
import com.private_lbs.taskmaster.member.exception.MemberException;
import com.private_lbs.taskmaster.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final JWTUtil jwtUtil;


    @Transactional
    public MemberResponse join(JoinMemberRequest joinMemberRequest) {
        Member member = joinMemberRequest.toMember();
        checkEmailExists(member.getEmail());

        // password 암호화 작업 추가

        memberRepository.save(member);
        return MemberResponse.toResponse(member);
    }

    public void checkEmailExists(String email) {
        memberRepository.findByEmail(email).ifPresent(member -> {
            throw new MemberException(MemberErrorCode.EMAIL_ALREADY_EXISTS);
        });
    }

    public void checkIdExists(Long id) {
        memberRepository.findById(id).ifPresent(member -> {
            throw new MemberException(MemberErrorCode.EMAIL_ALREADY_EXISTS);
        });
    }

    @Transactional
    public MemberLoginResponse login(LoginRequest loginRequest) {
        Member requestMember = loginRequest.toMember();
        Member member = memberRepository.findByEmail(requestMember.getEmail())
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_DOES_NOT_EXISTS));

        // 복호화 작업

        if (!requestMember.getPassword().equals(member.getPassword())) {
            throw new MemberException(MemberErrorCode.LOGIN_FAILED);
        }

        JwtToken token = jwtUtil.createToken(member);
        saveRefreshToken(member, token.getRefreshToken());

        return MemberLoginResponse.of(member, token);
    }


    public void saveRefreshToken(Member member, String refreshToken) {
        memberRepository.saveRefreshToken(member, refreshToken);
    }

    public boolean isRefreshToken(Member member, String refreshToken) {
        Optional<RefreshToken> findRefreshToken = memberRepository.getRefreshToken(member);
        return findRefreshToken.map(token -> token.getRefreshToken().equals(refreshToken)).orElse(false);
    }

    @Transactional
    public void logout(MemberLogoutRequest request) {

        Member requestMember = request.toMember();
        Member member = memberRepository.findById(requestMember.getId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_DOES_NOT_EXISTS));
        // delete 예외처리 X
        memberRepository.deleteRefreshToken(member);
    }

    public Member getMember(long userId) {
        return memberRepository.findById(userId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_DOES_NOT_EXISTS));
    }

    public Member getCurrentMember() {
        Authentication authentication = AuthenticationContextHolder.getAuthentication();
        long userId = authentication.getUserId();
        return getMember(userId);
    }
}
