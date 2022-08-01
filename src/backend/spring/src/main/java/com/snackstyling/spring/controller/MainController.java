package com.snackstyling.spring.controller;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.domain.Member;
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

    @RequestMapping(value="/user/information", method = RequestMethod.POST)
    public ResponseEntity information(@RequestBody Map<String, Object> req){
        String nickname=req.get("nickname").toString();
        int gender=(int)req.get("gender");
        int age=(int)req.get("age");
        int weight=(int)req.get("weight");
        int height=(int)req.get("height");
        loginService.insertInf(new Member(nickname,gender,age,weight,height));
        return new ResponseEntity(HttpStatus.OK);
    }

}
