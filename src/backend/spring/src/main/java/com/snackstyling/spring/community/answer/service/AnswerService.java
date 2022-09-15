package com.snackstyling.spring.community.answer.service;

import com.snackstyling.spring.common.domain.Notification;
import com.snackstyling.spring.common.repository.NotificationRepository;
import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.common.service.NotificationService;
import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.answer.dto.AnswerNumResponse;
import com.snackstyling.spring.community.answer.dto.AnswerRequest;
import com.snackstyling.spring.community.answer.repository.AnswerRepository;
import com.snackstyling.spring.community.common.dto.CoordinationDto;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.community.question.service.QuestionService;
import com.snackstyling.spring.community.common.dto.CodiDto;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final NotificationService notificationService;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final JwtService jwtService;

    public AnswerNumResponse postAnswer(String token, AnswerRequest answerRequest){
        Answer answer= new Answer();
        Member member=memberService.memberSelect(jwtService.getMemberId(token));
        Question question=questionService.questionSelect(answerRequest.getQid());
        // 알람 추가 코드
        Notification notify= new Notification();
        notify.setMember(member);
        notify.setQuestion(question);
        notify.setType(0); //0은 해당 질문에 답변이 달렸을 때 알람
        notificationService.saveNotification(notify);
        // 끝
        answer.setMember(member);
        answer.setQuestion(question);
        answer.setPostDate(LocalDateTime.now());
        answer.setComments(answerRequest.getComments());
        CoordinationDto codi=new CoordinationDto();
        codi.setTop(answerRequest.getCodi().getTop());
        codi.setBottom(answerRequest.getCodi().getBottom());
        codi.setCap(answerRequest.getCodi().getCap());
        codi.setFootwear(answerRequest.getCodi().getFootwear());

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000/api/v1/codi/";
        try {
            ResponseEntity<CodiDto> result = restTemplate.postForEntity(url, codi, CodiDto.class);
            answer.setCodi(result.getBody().getId());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
        }
        answerRepository.save(answer);
        return new AnswerNumResponse(answer.getId());
    }
    public void deleteAnswer(Long id){
        Answer answer=answerRepository.findById(id).orElse(null);
        answer.setUsed(0);
        answerRepository.save(answer);
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
        try {
            ResponseEntity<CodiDto> result=restTemplate.postForEntity(url,codi, CodiDto.class);
            answer.setCodi(result.getBody().getId());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
        }
        answerRepository.save(answer);
    }
    public void adoptAnswer(Long id){
        Answer answer=answerRepository.findById(id).orElse(null);
        answer.setAdopt(1);
        answer.getQuestion().setAdopt(1);
        answerRepository.save(answer);
        questionRepository.save(answer.getQuestion());
        // 내 답변이 채택받았을 때 코드
        Notification notify=new Notification();
        notify.setMember(answer.getMember());
        notify.setQuestion(answer.getQuestion());
        notify.setType(1);
        notificationService.saveNotification(notify);
        // 끝
    }
}
