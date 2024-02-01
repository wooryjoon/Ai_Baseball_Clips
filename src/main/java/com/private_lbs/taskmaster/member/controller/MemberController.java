package com.private_lbs.taskmaster.member.controller;

import com.private_lbs.taskmaster.member.data.dto.request.JoinMemberRequest;
import com.private_lbs.taskmaster.member.data.dto.request.LoginRequest;
import com.private_lbs.taskmaster.member.data.dto.request.MemberLogoutRequest;
import com.private_lbs.taskmaster.member.data.dto.response.MemberLoginResponse;
import com.private_lbs.taskmaster.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<Void> registerNewMember(@Valid @RequestBody JoinMemberRequest joinMemberRequest) {
        memberService.join(joinMemberRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Void> canUseEmail(@PathVariable String email) {
        memberService.checkEmailExists(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        MemberLoginResponse response = memberService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Auth(role = Role.USER)
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody MemberLogoutRequest request) {
        memberService.logout(request);
        return ResponseEntity.ok().build();
    }

    // Access 토큰 재발급
//    @PostMapping("/refresh")
//    public ResponseEntity<?> getTokenInfo(@PathVariable Long memberId, HttpServletRequest request) {
//
//        String refreshToken = request.getHeader("refresh-token");
//        Member member = memberService.getMemberOrThrow(memberId);
//
//        if (jwtUtil.checkToken(refreshToken))
//
//        if (memberService.isRefreshToken(member, refreshToken)) {
//
//            String accessToken = jwtUtil.createAccessToken(member.getEmail());
//            Map<String, String> data = new HashMap<>();
//            data.put("access-token", accessToken);
//            return BaseResponse.okWithData(HttpStatus.CREATED, "정상적으로 Access Token 재발급", data);
//        }
//    }
//        return BaseResponse.okWithData(HttpStatus.CREATED, "정상적으로 Access Token 재발급", "good");
//    }
}
