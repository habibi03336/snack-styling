package com.snackstyling.spring.login.service;

import com.snackstyling.spring.common.dto.TokenDto;
import com.snackstyling.spring.common.exception.ConflictException;
import com.snackstyling.spring.common.exception.NotFoundException;
import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.dto.*;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.login.repository.LoginRepository;
import com.snackstyling.spring.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;
    private final JoinService joinService;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${google.client.id}")
    private String googleClientId;
    @Value("${google.client.pw}")
    private String googleClientPw;
    @Value("${google.client.redirect}")
    private String googleRedirect;
    private final JwtService jwtService;
    public LoginResponse checkUser(AuthRequest authRequest){
        LoginResponse loginResponse=new LoginResponse();
        if(!loginRepository.existsByEmail(authRequest.getEmail())){
            throw new ConflictException("존재하지 않는 아이디입니다.");
        }
        Login user=loginRepository.findByEmail(authRequest.getEmail());
        if(!passwordEncoder.matches(authRequest.getPwd(),user.getPassword())){
            throw new ConflictException("패스워드가 불일치합니다.");
        }
        if(user.getUsed()==0){
            throw new NotFoundException("회원탈퇴한 유저입니다.");
        }
        Member member=memberRepository.findByLogin(user);
        if(member==null){
            loginResponse.setIsMember(false);
        }
        else{
            loginResponse.setIsMember(true);
        }
        TokenDto tokens=jwtService.createToken(member);
        loginResponse.setTokens(tokens);
        return loginResponse;
    }
    public Login loginUser(String email){ return loginRepository.findByEmail(email); }
    public Object googleLogin(AuthCodeRequest authCodeRequest){
        RestTemplate restTemplate = new RestTemplate();
        GoogleRequest googleOAuthRequestParam = GoogleRequest
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientPw)
                .code(authCodeRequest.getCode())
                .redirectUri(googleRedirect)
                .grantType("authorization_code").build();
        ResponseEntity<GoogleResponse> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
                googleOAuthRequestParam, GoogleResponse.class);
        String jwtToken=resultEntity.getBody().getId_token();
        Map<String, String> map=new HashMap<>();
        map.put("id_token",jwtToken);
        ResponseEntity<GoogleInfResponse> resultEntity2 = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
                map, GoogleInfResponse.class);
        String email=resultEntity2.getBody().getEmail();
        Login user=loginUser(email);
        if(user!=null){
            Member member=memberRepository.findByLogin(user);
            LoginResponse loginResponse=new LoginResponse();
            if(member==null){
                loginResponse.setIsMember(false);
            }
            else{
                loginResponse.setIsMember(true);
            }

            loginResponse.setTokens(jwtService.createToken(member));
            return loginResponse;
        }
        else{
            AuthRequest authRequest=new AuthRequest();
            authRequest.setEmail(email);
            authRequest.setPwd(resultEntity2.getBody().getAt_hash());
            return joinService.joinUser(authRequest, 1);
        }
    }
}
