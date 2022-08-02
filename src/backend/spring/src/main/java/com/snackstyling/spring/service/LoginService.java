package com.snackstyling.spring.service;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.domain.Member;
import com.snackstyling.spring.repository.LoginRepository;
import com.snackstyling.spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;
    private final MemberRepository memberRepository;


    public void joinUser(Login user){
        loginRepository.save(user);
    }
    public Login selectLogin(Long id){
        return loginRepository.findById(id).orElse(null);
    }
    public Member selectMember(Long id){
        return memberRepository.findById(id).orElse(null);
    }
    public Login loginUser(String email){ return loginRepository.findByEmail(email); }
    public void insertInf(Member member){
        memberRepository.save(member);
    }

}
