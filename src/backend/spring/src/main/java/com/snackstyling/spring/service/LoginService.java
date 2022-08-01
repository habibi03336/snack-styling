package com.snackstyling.spring.service;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.domain.Member;
import com.snackstyling.spring.repository.LoginRepository;
import com.snackstyling.spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;
    private final MemberRepository memberRepository;


    public void joinUser(Login user){
        loginRepository.save(user);
    }
    public void insertInf(Member member){
        memberRepository.save(member);
    }

}
