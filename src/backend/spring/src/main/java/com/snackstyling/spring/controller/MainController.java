package com.snackstyling.spring.controller;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MainController {
    private final LoginService loginService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value="/oauth/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody Map<String, Object> req){
        String email=req.get("email").toString();
        String encPwd=passwordEncoder.encode(req.get("password").toString());
        loginService.joinUser(new Login(email,encPwd));
        return new ResponseEntity(HttpStatus.OK);
    }
}
