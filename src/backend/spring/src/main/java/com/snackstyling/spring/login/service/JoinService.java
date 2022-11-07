package com.snackstyling.spring.login.service;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.dto.AuthRequest;
import com.snackstyling.spring.login.dto.LoginResponse;
import com.snackstyling.spring.login.exception.DuplicateEmailException;
import com.snackstyling.spring.login.exception.NonePwdException;
import com.snackstyling.spring.login.repository.LoginRepository;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class JoinService {
    private final LoginRepository loginRepository;
    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    // 비밀번호 포맷 확인(영문, 특수문자, 숫자 포함 8자 이상)
    private Pattern passPatten=Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$");
    private List<String> adjective=List.of("행복한","놀라운","흥겨운", "즐거운", "기쁜",
            "용감한","명량한","명석한","똑똑한","유쾌한","탐나는","단호한","당환한","신난","관대한","정직한","유망한","희망찬","대단한","순진한");
    private List<String>
            noun=List.of("강아지","고양이","염소", "호랑이", "토끼",
            "탬버린","훌라후프","줄넘기","코끼리","기린","꽹과리","장구","가야금","축구공","농구공","마이크","스피커","키보드","마우스","야구공");
    private List<String> names=new ArrayList<>();
    private Integer num=0;

    public LoginResponse joinUser(AuthRequest authRequest){
        //login inf save
        Matcher passMatcher=passPatten.matcher(authRequest.getPwd());
        if(!passMatcher.find()){
            throw new NonePwdException("비밀번호는 영문, 특수문자, 숫자를 포함해서 8자 이상입니다.");
        }
        LoginResponse loginResponse=new LoginResponse();
        loginResponse.setIsMember(false);
        Login user=new Login();
        user.setEmail(authRequest.getEmail());
        user.setPassword(passwordEncoder.encode(authRequest.getPwd()));
        loginRepository.save(user);
        //member inf save
        String nickname;
        while(true){
            if(names.size()>=400){
                nickname="스낵스타일링"+String.valueOf(num);
                num++;
                break;
            }
            int adjective_index=(int)(Math.random()*20);
            int noun_index=(int)(Math.random()*20);
            nickname=adjective.get(adjective_index)+" "+noun.get(noun_index);
            if(!names.contains(nickname)){
                names.add(nickname);
                break;
            }
        }
        Member member=new Member();
        member.setLogin(user);
        member.setNickname(nickname);
        memberRepository.save(member);
        loginResponse.setTokens(jwtService.createToken(member));
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
