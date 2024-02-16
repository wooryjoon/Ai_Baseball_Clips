package com.private_lbs.taskmaster.member.controller;

import com.private_lbs.taskmaster.global.auth.Auth;
import com.private_lbs.taskmaster.member.data.dto.request.JoinMemberRequest;
import com.private_lbs.taskmaster.member.data.dto.request.LoginRequest;
import com.private_lbs.taskmaster.member.data.dto.request.MemberLogoutRequest;
import com.private_lbs.taskmaster.member.data.dto.request.TokenRefreshRequest;
import com.private_lbs.taskmaster.member.data.dto.response.MemberLoginResponse;
import com.private_lbs.taskmaster.member.data.dto.response.MemberResponse;
import com.private_lbs.taskmaster.member.data.dto.response.TokenRefreshResponse;
import com.private_lbs.taskmaster.member.domain.Role;
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


    @PostMapping("/refresh")
    public ResponseEntity<TokenRefreshResponse> refresh(@RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok().body(memberService.refresh(request));
    }

    @Auth
    @GetMapping("/info")
    public ResponseEntity<MemberResponse> getMemberInfo() {
        return ResponseEntity.ok().body(memberService.getMemberInfo());
    }

}
