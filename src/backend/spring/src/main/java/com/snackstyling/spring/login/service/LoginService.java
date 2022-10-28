package com.snackstyling.spring.login.service;

import com.snackstyling.spring.common.dto.TokenDto;
import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.dto.*;
import com.snackstyling.spring.login.exception.NoneEmailException;
import com.snackstyling.spring.login.exception.NoneMemberException;
import com.snackstyling.spring.login.exception.NonePwdException;
import com.snackstyling.spring.login.exception.WithdrawException;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.login.repository.LoginRepository;
import com.snackstyling.spring.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        if(!loginRepository.existsByEmail(authRequest.getEmail())){
            throw new NoneEmailException("존재하지 않는 아이디입니다.");
        }
        Login user=loginRepository.findByEmail(authRequest.getEmail());
        if(!passwordEncoder.matches(authRequest.getPwd(),user.getPassword())){
            throw new NonePwdException("패스워드가 불일치합니다.");
        }
        if(user.getUsed()==0){
            throw new WithdrawException("회원탈퇴한 유저입니다.");
        }
        Member member=memberRepository.findByLogin(user);
        if(member==null){
            throw new NoneMemberException("맴버정보를 입력하지 않았습니다.");
        }
        TokenDto tokens=jwtService.createToken(authRequest.getEmail(), member);
        return new LoginResponse(tokens);
    }
    public Login selectLogin(Long id){ return loginRepository.findById(id).orElse(null);}
    public Login loginUser(String email){ return loginRepository.findByEmail(email); }
    public Member findMemberId(Login login){return memberRepository.findByLogin(login);}
    public Object googleLogin(String authCode){
        RestTemplate restTemplate = new RestTemplate();
        GoogleRequest googleOAuthRequestParam = GoogleRequest
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientPw)
                .code(authCode)
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
            if(member==null){
                throw new NoneMemberException("맴버정보를 입력하지 않았습니다.");
            }
            TokenDto tokens=jwtService.createToken(email, member);
            return new LoginResponse(tokens);
        }
        else{
            AuthRequest authRequest=new AuthRequest();
            authRequest.setEmail(email);
            authRequest.setPwd(resultEntity2.getBody().getAt_hash());
            return joinService.joinUser(authRequest);
        }
    }


}
