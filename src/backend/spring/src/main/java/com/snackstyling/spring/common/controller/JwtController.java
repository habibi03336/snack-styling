package com.snackstyling.spring.common.controller;

import com.snackstyling.spring.common.dto.AcTokenResponse;
import com.snackstyling.spring.common.service.JwtService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class JwtController {
    private final JwtService jwtService;
    @ApiOperation(value="Access Token 새로 발급",notes = "<strong>refresh 토큰이 유효하다면 access 새로 발급</strong>")
    @RequestMapping(value="/api/v1/accounts/token", method = RequestMethod.POST)
    public ResponseEntity<AcTokenResponse> createAccessToken(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok().body(jwtService.refreshCompare(token));
    }
    @ApiOperation(value="Access Token 확인",notes = "<strong>accesstoken 토큰이 유효한지 테스트</strong>")
    @RequestMapping(value="/api/v1/accounts/token", method = RequestMethod.GET)
    public ResponseEntity checkAccessToken(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().build();
    }
}
