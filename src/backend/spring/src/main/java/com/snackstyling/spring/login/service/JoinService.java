package com.snackstyling.spring.login.service;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.dto.AuthRequest;
import com.snackstyling.spring.login.dto.LoginResponse;
import com.snackstyling.spring.login.exception.DuplicateEmailException;
import com.snackstyling.spring.login.exception.NonePwdException;
import com.snackstyling.spring.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinService {
    private final LoginRepository loginRepository;
    private final JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public LoginResponse joinUser(AuthRequest authRequest){
        LoginResponse loginResponse=new LoginResponse();
        loginResponse.setIsMember(false);
        Login user=new Login();
        user.setEmail(authRequest.getEmail());
        user.setPassword(passwordEncoder.encode(authRequest.getPwd()));
        loginRepository.save(user);
        loginResponse.setTokens(jwtService.createToken(user));
        return loginResponse;
    }
    public void dupUser(String email){
        if(loginRepository.existsByEmail(email)){
            throw new DuplicateEmailException("아이디가 중복되었습니다.");
        }
    }
    public void outUser(AuthRequest authRequest){
        Login user=loginRepository.findByEmail(authRequest.getEmail());
        if(!passwordEncoder.matches(authRequest.getPwd(),user.getPassword())){
            throw new NonePwdException("패스워드가 불일치합니다.");
        }
        user.setUsed(0);
        loginRepository.save(user);
    }
    public void updateUser(AuthRequest authRequest){
        Login user=loginRepository.findByEmail(authRequest.getEmail());
        user.setPassword(passwordEncoder.encode(authRequest.getPwd()));
        loginRepository.save(user);
    }
}
