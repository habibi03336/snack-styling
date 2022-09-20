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
import com.snackstyling.spring.community.question.exception.AdoptQueException;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.community.question.service.QuestionService;
import com.snackstyling.spring.community.common.dto.CodiDto;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
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

        Map<String, Object> map=new HashMap<>();
        map.put("top",answerRequest.getCodi().getTop());
        map.put("bottom", answerRequest.getCodi().getBottom());
        map.put("cap", answerRequest.getCodi().getCap());
        map.put("footwear",answerRequest.getCodi().getFootwear());
        HttpHeaders headers=new HttpHeaders();
        headers.set("Authorization", token);

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000/api/v1/codi/";
        HttpEntity<Map<String, Object>> entity=new HttpEntity<>(map,headers);
        try {
            ResponseEntity<CodiDto> result = restTemplate.postForEntity(url,entity, CodiDto.class);
            answer.setCodi(result.getBody().getId());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
        }
        answerRepository.save(answer);
        return new AnswerNumResponse(answer.getId());
    }
    public void deleteAnswer(Long id){
        Answer answer=answerRepository.findById(id).orElse(null);
        Question question=answer.getQuestion();
        if(question.getAdopt()==1){
            throw new AdoptQueException("채택된 질문으로 삭제할 수 없습니다.");
        }
        answer.setUsed(0);
        answerRepository.save(answer);
    }
    public void updateAnswer(Long id, AnswerRequest answerRequest, String token){
        Answer answer=answerRepository.findById(id).orElse(null);
        Question question=answer.getQuestion();
        if(question.getAdopt()==1){
            throw new AdoptQueException("채택된 질문으로 수정할 수 없습니다.");
        }
        answer.setComments(answerRequest.getComments());

        Map<String, Object> map=new HashMap<>();
        map.put("top",answerRequest.getCodi().getTop());
        map.put("bottom", answerRequest.getCodi().getBottom());
        map.put("cap", answerRequest.getCodi().getCap());
        map.put("footwear",answerRequest.getCodi().getFootwear());
        HttpHeaders headers=new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Map<String, Object>> entity=new HttpEntity<>(map,headers);

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000/api/v1/codi/";
        try {
            ResponseEntity<CodiDto> result=restTemplate.postForEntity(url,entity, CodiDto.class);
            answer.setCodi(result.getBody().getId());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
        }
        answerRepository.save(answer);
    }
    public void adoptAnswer(Long id, String token){
        Answer answer=answerRepository.findById(id).orElse(null);
        answer.setAdopt(1);
        answer.getQuestion().setAdopt(1);
        answerRepository.save(answer);
        questionRepository.save(answer.getQuestion());
        //장고한테 채택한 코디 알려줌
        HttpHeaders headers=new HttpHeaders();
        headers.set("Authorization", token);

        RestTemplate restTemplate=new RestTemplate();
        String url="http://backend-django:8000api/v1/codi/"+answer.getCodi().toString()+"/dup_create/";
        Map<String, Object> map=new HashMap<>();
        map.put("userId",answer.getQuestion().getMember().getId());
        HttpEntity<Map<String, Object>> entity=new HttpEntity<>(map,headers);
        try {
            ResponseEntity result=restTemplate.postForEntity(url,entity, CodiDto.class);
            System.out.println(result.getStatusCode());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
        }

        // 내 답변이 채택받았을 때 코드
        Notification notify=new Notification();
        notify.setMember(answer.getMember());
        notify.setQuestion(answer.getQuestion());
        notify.setType(1);
        notificationService.saveNotification(notify);
        // 끝
    }
}
