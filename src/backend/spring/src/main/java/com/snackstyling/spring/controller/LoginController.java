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
@CrossOrigin("*")
public class LoginController {
    private final LoginService loginService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value="/oauth/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody Map<String, Object> req){
        Login user=new Login();
        user.setEmail(req.get("email").toString());
        user.setPassword(passwordEncoder.encode(req.get("password").toString()));
        user.setUsed(1);
        loginService.joinUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value="/user/information", method = RequestMethod.POST)
    public ResponseEntity information(@RequestBody Map<String, Object> req){
        Member user=new Member();
        user.setLogin(loginService.selectLogin(Long.parseLong(req.get("id").toString())));
        user.setAge((Integer) req.get("age"));
        user.setNickname(req.get("nickname").toString());
        user.setGender((Integer) req.get("gender"));
        user.setWeight((Integer) req.get("weight"));
        user.setHeight((Integer) req.get("height"));
        loginService.insertInf(user);
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value="/oauth/login", method = RequestMethod.POST)
    public ResponseEntity userLogin(@RequestBody Map<String, Object> req){
        try{
            Login user = loginService.loginUser(req.get("email").toString());
            if(passwordEncoder.matches(req.get("pwd").toString(),user.getPassword())){
                return new ResponseEntity(HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
