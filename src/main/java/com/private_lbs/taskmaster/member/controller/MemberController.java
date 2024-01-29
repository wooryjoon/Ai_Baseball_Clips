package com.private_lbs.taskmaster.member.controller;

import com.private_lbs.taskmaster.global.response.BaseResponse;
import com.private_lbs.taskmaster.global.response.MemberResponse;
import com.private_lbs.taskmaster.global.util.JWTUtil;
import com.private_lbs.taskmaster.member.dto.JoinMemberRequest;
import com.private_lbs.taskmaster.member.dto.LoginRequest;
import com.private_lbs.taskmaster.member.dto.MemberLogoutRequest;
import com.private_lbs.taskmaster.member.entity.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JWTUtil jwtUtil;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinMemberRequest joinMemberRequest) {
        return BaseResponse.okWithData(HttpStatus.OK, "회원 가입 완료", memberService.join(joinMemberRequest));
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        boolean isAvailable = memberService.isEmailAvailable(email);
        Map<String, Boolean> data = new HashMap<>();

        if (isAvailable) {
            data.put("available", true);
            return BaseResponse.okWithData(HttpStatus.OK, "사용 가능한 이메일 입니다.", data);
        } else {
            data.put("available", false);
            return BaseResponse.okWithData(HttpStatus.OK, "이미 사용중인 이메일 입니다.", data);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Optional<Member> isMember = memberService.isMember(loginRequest);
        if (isMember.isPresent()) {
            Member member = isMember.get();
            String accessToken = jwtUtil.createAccessToken(member.getEmail());
            String refreshToken = jwtUtil.createRefreshToken(member.getEmail());

            // refresh token db에 저장
            memberService.saveRefreshToken(member, refreshToken);

            Map<String, Object> data = new HashMap<>();
            data.put("access-token", accessToken);
            data.put("refresh-token", refreshToken);
            data.put("member", MemberResponse.toResponse(member));
            return BaseResponse.okWithData(HttpStatus.CREATED, "로그인 되었습니다", data);
        } else {
            return BaseResponse.fail("아이디 또는 패스워드를 확인해주세요.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody MemberLogoutRequest request) {
        Member requestMember = memberService.getMemberOrThrow(request.getId());
        try {
            memberService.deleteRefreshToken(requestMember);
            return BaseResponse.ok(HttpStatus.OK, "로그아웃 되었습니다");
        } catch (Exception e) {
            return BaseResponse.ok(HttpStatus.INTERNAL_SERVER_ERROR, "로그아웃 실패");
        }
    }

    // Access 토큰 재발급
    @PostMapping("/refresh")
    public ResponseEntity<?> getTokenInfo(@PathVariable Long memberId, HttpServletRequest request) {

        String refreshToken = request.getHeader("refresh-token");
        Member member = memberService.getMemberOrThrow(memberId);

        if (jwtUtil.checkToken(refreshToken)) {
            System.out.println("여기까지옴??????????");
            if (memberService.isRefreshToken(member, refreshToken)) {
                System.out.println("여기까지옴????????");
                String accessToken = jwtUtil.createAccessToken(member.getEmail());
                Map<String, String> data = new HashMap<>();
                data.put("access-token", accessToken);
                return BaseResponse.okWithData(HttpStatus.CREATED, "정상적으로 Access Token 재발급", data);
            }
        }
        return BaseResponse.fail("Refresh Token 사용 불가능", HttpStatus.UNAUTHORIZED);
    }
}
