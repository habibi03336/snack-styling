package com.snackstyling.spring.common.controller;

import com.snackstyling.spring.common.dto.AcTokenResponse;
import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.login.dto.AuthRequest;
import com.snackstyling.spring.login.dto.AuthResponse;
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
}
