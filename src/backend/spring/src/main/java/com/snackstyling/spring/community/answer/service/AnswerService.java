package com.snackstyling.spring.community.answer.service;

import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.answer.dto.AnswerNumResponse;
import com.snackstyling.spring.community.answer.dto.AnswerRequest;
import com.snackstyling.spring.community.answer.repository.AnswerRepository;
import com.snackstyling.spring.community.common.dto.CoordinationDto;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.QuestionRequest;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.community.question.service.QuestionService;
import com.snackstyling.spring.community.common.dto.CodiDto;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    public AnswerNumResponse postAnswer(AnswerRequest answerRequest){
        Answer answer= new Answer();
        answer.setMember(memberService.memberSelect(answerRequest.getMid()));
        answer.setQuestion(questionService.questionSelect(answerRequest.getQid()));
        answer.setPostDate(LocalDateTime.now());
        answer.setComments(answerRequest.getComments());
        CoordinationDto codi=new CoordinationDto();
        codi.setTop(answerRequest.getCodi().getTop());
        codi.setBottom(answerRequest.getCodi().getBottom());
        codi.setCap(answerRequest.getCodi().getCap());
        codi.setFootwear(answerRequest.getCodi().getFootwear());

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000/api/v1/codi/";
        ResponseEntity<CodiDto> result=restTemplate.postForEntity(url,codi, CodiDto.class);
        answer.setCodi(result.getBody().getId());
        answerRepository.save(answer);
        return new AnswerNumResponse(answer.getId());
    }
    public void deleteAnswer(Long id){
        answerRepository.deleteById(id);
    }
    public void updateAnswer(Long id, AnswerRequest answerRequest){
        Answer answer=answerRepository.findById(id).orElse(null);
        answer.setComments(answerRequest.getComments());
        CoordinationDto codi=new CoordinationDto();
        codi.setTop(answerRequest.getCodi().getTop());
        codi.setBottom(answerRequest.getCodi().getBottom());
        codi.setCap(answerRequest.getCodi().getCap());
        codi.setFootwear(answerRequest.getCodi().getFootwear());

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000/api/v1/codi/";
        ResponseEntity<CodiDto> result=restTemplate.postForEntity(url,codi, CodiDto.class);
        answer.setCodi(result.getBody().getId());
        answerRepository.save(answer);
    }
    public void adoptAnswer(Long id){
        Answer answer=answerRepository.findById(id).orElse(null);
        answer.setAdopt(1);
        answer.getQuestion().setAdopt(1);
        answerRepository.save(answer);
        questionRepository.save(answer.getQuestion());

    }
}
