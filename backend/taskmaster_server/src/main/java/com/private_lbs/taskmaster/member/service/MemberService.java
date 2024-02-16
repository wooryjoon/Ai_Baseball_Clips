package com.private_lbs.taskmaster.member.service;

import com.private_lbs.taskmaster.global.auth.Authentication;
import com.private_lbs.taskmaster.global.auth.AuthenticationContextHolder;
import com.private_lbs.taskmaster.global.auth.exception.AuthenticationErrorCode;
import com.private_lbs.taskmaster.global.auth.exception.AuthenticationException;
import com.private_lbs.taskmaster.global.util.JWTUtil;
import com.private_lbs.taskmaster.member.data.dto.request.JoinMemberRequest;
import com.private_lbs.taskmaster.member.data.dto.request.LoginRequest;
import com.private_lbs.taskmaster.member.data.dto.request.MemberLogoutRequest;
import com.private_lbs.taskmaster.member.data.dto.request.TokenRefreshRequest;
import com.private_lbs.taskmaster.member.data.dto.response.MemberLoginResponse;
import com.private_lbs.taskmaster.member.data.dto.response.MemberResponse;
import com.private_lbs.taskmaster.member.data.dto.response.TokenRefreshResponse;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.domain.repository.MemberRepository;
import com.private_lbs.taskmaster.member.exception.MemberErrorCode;
import com.private_lbs.taskmaster.member.exception.MemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final StringRedisTemplate redisTemplate;
    private final JWTUtil jwtUtil;


    @Transactional
    public void join(JoinMemberRequest joinMemberRequest) {
        Member member = joinMemberRequest.toMember();
        checkEmailExists(member.getEmail());

        // password 암호화 작업 추가

        memberRepository.save(member);
    }

    public void checkEmailExists(String email) {
        memberRepository.findByEmail(email).ifPresent(member -> {
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

        String accessToken = jwtUtil.createAccessToken(member);

        UUID uuid = UUID.randomUUID();
        String refreshToken = jwtUtil.createRefreshToken(uuid.toString());

        redisTemplate.opsForValue()
                .set(uuid.toString(), refreshToken);

        return MemberLoginResponse.of(member, accessToken, refreshToken);
    }


    public TokenRefreshResponse refresh(TokenRefreshRequest request) {
        String refreshTokenId = jwtUtil.getPayload(request.getRefreshToken());

        if (redisTemplate.opsForValue()
                .get(refreshTokenId) == null) {
            throw new AuthenticationException(AuthenticationErrorCode.TOKEN_IS_NOT_VALID);
        }

        long tokenUserId = Long.parseLong(jwtUtil.getPayload(request.getAccessToken()));

        Member member = memberRepository.findById(tokenUserId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_DOES_NOT_EXISTS));

        String accessToken = jwtUtil.createAccessToken(member);

        return TokenRefreshResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    @Transactional
    public void logout(MemberLogoutRequest request) {

        Member requestMember = request.toMember();
        Member member = memberRepository.findById(requestMember.getId())
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_DOES_NOT_EXISTS));
        // delete 예외처리 X
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

    public MemberResponse getMemberInfo() {
        return MemberResponse.toResponse(getCurrentMember());
    }
}
