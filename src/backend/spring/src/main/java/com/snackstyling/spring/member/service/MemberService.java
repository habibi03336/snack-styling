package com.snackstyling.spring.member.service;

import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.service.LoginService;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.dto.MemberRequest;
import com.snackstyling.spring.member.dto.MemberResponse;
import com.snackstyling.spring.member.exception.DuplicateNameException;
import com.snackstyling.spring.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final LoginService loginService;
    private final MemberRepository memberRepository;
    public void memberInsert(MemberRequest memberRequest){
        if(memberRepository.existsByNickname(memberRequest.getNickname())){
            throw new DuplicateNameException("닉네임이 중복되었습니다.");
        }
        Member member=new Member();
        member.setLogin(loginService.selectLogin(memberRequest.getId()));
        member.setAge(memberRequest.getAge());
        member.setNickname(memberRequest.getNickname());
        member.setGender(memberRequest.getGender());
        member.setWeight(memberRequest.getWeight());
        member.setHeight(memberRequest.getHeight());
        memberRepository.save(member);
    }
}
