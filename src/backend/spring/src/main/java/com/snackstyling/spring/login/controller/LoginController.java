package com.snackstyling.spring.login.controller;

import com.snackstyling.spring.login.dto.*;
import com.snackstyling.spring.login.service.JoinService;
import com.snackstyling.spring.login.service.LoginService;
import com.snackstyling.spring.login.service.MailService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
public class LoginController {
    private final JoinService joinService;
    private final LoginService loginService;
    private final MailService mailService;
    @ApiOperation(value="회원가입",notes = "<strong>이메일과 패스워드를 입력받아 회원 가입을 진행한다.</strong>")
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> userRegister(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok().body(joinService.joinUser(authRequest));
    }
    @ApiOperation(value="로그인",notes = "<strong>이메일과 패스워드를 입력받아 성공 여부를 알린다.</strong>")
    @PostMapping("")
    public ResponseEntity<LoginResponse> userLogin(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok().body(loginService.checkUser(authRequest));
    }
    @ApiOperation(value="회원탈퇴",notes = "<strong>회원 탈퇴</strong>")
    @DeleteMapping("")
    public ResponseEntity userDelete(@RequestBody AuthRequest authRequest){
        //비밀번호를 한 번 더 입력해서 맞다면 삭제를 시켜준다.
        joinService.outUser(authRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="비밀번호수정",notes = "<strong>회원수정</strong>")
    @PatchMapping("")
    public ResponseEntity userUpdate(@RequestBody AuthRequest authRequest){
        joinService.updateUser(authRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="이메일 중복 확인",notes = "<strong>이메일 중복은 가입 앙대영~</strong>")
    @GetMapping("/duplication")
    public ResponseEntity dupUser(@RequestParam("email") String email){
        joinService.dupUser(email);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="인증 메일 전송",notes = "<strong>인증메일전송</strong>")
    @PostMapping("/mail/send")
    public ResponseEntity checkUser(@RequestBody ConfirmRequest confirmRequest){
        mailService.sendMail(confirmRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="인증 메일 확인",notes = "<strong>인증메일확인</strong>")
    @PostMapping("/mail/confirm")
    public ResponseEntity confirmUser(@RequestBody CompareRequest compareRequest){
        mailService.checkMail(compareRequest);
        return ResponseEntity.ok().build();
    }
}
