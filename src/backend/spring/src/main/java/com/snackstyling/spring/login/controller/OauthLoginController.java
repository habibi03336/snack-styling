package com.snackstyling.spring.login.controller;

import com.snackstyling.spring.login.dto.AuthCodeRequest;
import com.snackstyling.spring.login.service.LoginService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth2")
public class OauthLoginController {
    private final LoginService loginService;
    @ApiOperation(value="구글 로그인",notes = "<strong>구글로 로그인을 진행한다.</strong>")
    @PostMapping(value="/google")
    public ResponseEntity<Object> loginGoogle(@RequestBody AuthCodeRequest authCodeRequest){
        return ResponseEntity.ok().body(loginService.googleLogin(authCodeRequest));
    }
}
