package com.snackstyling.spring.controller;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.domain.Member;
import com.snackstyling.spring.dto.LoginDto;
import com.snackstyling.spring.dto.MemberDto;
import com.snackstyling.spring.service.LoginService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ExampleProperty;
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

    @ApiOperation(value="회원 가입",notes = "<strong>이메일과 패스워드를 입력받아 회원 가입을 진행한다.</strong>")
    @RequestMapping(value="/oauth/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody LoginDto loginDto){
        Login user=new Login();
        user.setEmail(loginDto.getEmail());
        user.setPassword(passwordEncoder.encode(loginDto.getPwd()));
        user.setUsed(1);
        loginService.joinUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ApiOperation(value="맴버정보 입력",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장한다.</strong>")
    @RequestMapping(value="/user/information", method = RequestMethod.POST)
    public ResponseEntity information(@RequestBody MemberDto memberDto){
        Member user=new Member();
        user.setLogin(loginService.selectLogin(memberDto.getId()));
        user.setAge(memberDto.getAge());
        user.setNickname(memberDto.getNickname());
        user.setGender(memberDto.getGender());
        user.setWeight(memberDto.getWeight());
        user.setHeight(memberDto.getHeight());
        loginService.insertInf(user);
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="로그인",notes = "<strong>이메일과 패스워드를 입력받아 성공 여부를 알린다.</strong>")
    @RequestMapping(value="/oauth/login", method = RequestMethod.POST)
    public ResponseEntity userLogin(@RequestBody LoginDto loginDto){
        try{
            Login user = loginService.loginUser(loginDto.getEmail());
            if(passwordEncoder.matches(loginDto.getPwd(),user.getPassword())){
                return new ResponseEntity(HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
