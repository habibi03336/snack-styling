package com.snackstyling.spring.member.service;

import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import com.snackstyling.spring.community.answer.repository.AnswerRepository;
import com.snackstyling.spring.community.common.dto.ClothDto;
import com.snackstyling.spring.community.common.dto.OccasionDto;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.QuestionResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.login.service.LoginService;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.dto.MemberRequest;
import com.snackstyling.spring.member.dto.MemberInfResponse;
import com.snackstyling.spring.member.exception.DuplicateNameException;
import com.snackstyling.spring.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final LoginService loginService;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
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
    public Member memberSelect(Long id){
        return memberRepository.findById(id).orElse(null);
    }
    public MemberInfResponse memberMyPage(Long id){
        Member member=memberSelect(id);
        return new MemberInfResponse(member.getNickname(),0);
    }
    public QuestionsResponse memberQuestions(Long id){
        Member member=memberSelect(id);
        List<Question> questions=questionRepository.findByMember(member);
        List<QuestionResponse> questionResponses=new ArrayList<>();
        for (Question temp: questions){
            QuestionResponse questionResponse=new QuestionResponse();
            questionResponse.setQid(temp.getId());
            questionResponse.setMid(temp.getMember().getId());
            questionResponse.setNickname(temp.getMember().getNickname());
            questionResponse.setWeight(temp.getMember().getWeight());
            questionResponse.setHeight(temp.getMember().getHeight());
            questionResponse.setPostDate(temp.getPostDate());
            questionResponse.setEndDate(temp.getEndDate());
            questionResponse.setTpo(new OccasionDto().getTpo(temp.getTpo()));
            questionResponse.setComments(temp.getComments());
            questionResponse.setAnsCount(answerRepository.countByAnswer(temp));
            questionResponses.add(questionResponse);
        }
        return new QuestionsResponse(questionResponses);
    }
    public QuestionsResponse memberAnswers(Long id){
        Member member=memberSelect(id);
        List<Answer> answers=answerRepository.findByMember(member);
        List<QuestionResponse> questionResponses=new ArrayList<>();
        for(Answer ans :answers){
            QuestionResponse questionResponse=new QuestionResponse();
            Question temp=ans.getQuestion();
            questionResponse.setQid(temp.getId());
            questionResponse.setMid(temp.getMember().getId());
            questionResponse.setNickname(temp.getMember().getNickname());
            questionResponse.setWeight(temp.getMember().getWeight());
            questionResponse.setHeight(temp.getMember().getHeight());
            questionResponse.setPostDate(temp.getPostDate());
            questionResponse.setEndDate(temp.getEndDate());
            questionResponse.setTpo(new OccasionDto().getTpo(temp.getTpo()));
            questionResponse.setComments(temp.getComments());
            questionResponse.setAnsCount(answerRepository.countByAnswer(temp));
            questionResponses.add(questionResponse);
        }
        return new QuestionsResponse(questionResponses);
    }

}
