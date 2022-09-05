package com.snackstyling.spring.login.controller;

import com.snackstyling.spring.login.dto.AuthRequest;
import com.snackstyling.spring.login.dto.AuthResponse;
import com.snackstyling.spring.login.dto.LoginResponse;
import com.snackstyling.spring.login.service.JoinService;
import com.snackstyling.spring.login.service.LoginService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class LoginController {
    private final JoinService joinService;
    private final LoginService loginService;
    @ApiOperation(value="회원가입",notes = "<strong>이메일과 패스워드를 입력받아 회원 가입을 진행한다.</strong>")
    @RequestMapping(value="/api/v1/accounts/register", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> userRegister(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok().body(joinService.joinUser(authRequest));
    }

    @ApiOperation(value="로그인",notes = "<strong>이메일과 패스워드를 입력받아 성공 여부를 알린다.</strong>")
    @RequestMapping(value="/api/v1/accounts", method = RequestMethod.POST)
    public ResponseEntity<LoginResponse> userLogin(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok().body(loginService.checkUser(authRequest));
    }

    @ApiOperation(value="회원탈퇴",notes = "<strong>회원 탈퇴</strong>")
    @RequestMapping(value="/api/v1/accounts", method = RequestMethod.DELETE)
    public ResponseEntity userDelete(@RequestBody AuthRequest authRequest){
        //비밀번호를 한 번 더 입력해서 맞다면 삭제를 시켜준다.
        joinService.outUser(authRequest);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value="비밀번호수정",notes = "<strong>회원수정</strong>")
    @RequestMapping(value="/api/v1/accounts", method = RequestMethod.PATCH)
    public ResponseEntity userUpdate(@RequestBody AuthRequest authRequest){
        joinService.updateUser(authRequest);
        return ResponseEntity.ok().build();
    }

}
