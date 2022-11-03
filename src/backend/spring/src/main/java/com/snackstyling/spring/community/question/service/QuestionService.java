package com.snackstyling.spring.community.question.service;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import com.snackstyling.spring.community.answer.repository.AnswerRepository;
import com.snackstyling.spring.community.common.dto.ClothDto;
import com.snackstyling.spring.community.common.dto.OccasionDto;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.*;
import com.snackstyling.spring.community.question.exception.AdoptQueException;
import com.snackstyling.spring.community.question.exception.DelQueException;
import com.snackstyling.spring.community.question.exception.ExistAnsException;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final JwtService jwtService;
    public QuestionNumResponse questionPost(String token, QuestionRequest questionRequest){
        Question question=new Question();
        question.setMember(memberService.memberSelect(jwtService.getMemberId(token)));
        question.setTpo(questionRequest.getTpo());
        question.setEndDate(questionRequest.getEndDate());
        question.setPostDate(LocalDateTime.now());
        question.setComments(questionRequest.getComments());
        questionRepository.save(question);
        return new QuestionNumResponse(question.getId());
    }
    public QuestionsResponse questionList(Integer page, Integer adopt, Integer tpo){
        Pageable pageable = PageRequest.of(page,7, Sort.by("postDate").descending());
        Page<Question> pages;
        //adopt=-1, tpo=-1
        //adopt=-1, tpo 만 존재
        //adopt 만 존재 top=-1
        //둘 다 존재
        if(adopt==-1 && tpo==-1){
            pages=questionRepository.findAllByUsed(1,pageable);
        }
        else if(adopt==-1){
            pages=questionRepository.findAllByUsedAndTpo(1,tpo,pageable);
        }
        else if (tpo==-1){
            pages=questionRepository.findAllByUsedAndAdopt(1, adopt,pageable);

        }
        else{
            pages=questionRepository.findAllByUsedAndAdoptAndTpo(1,adopt,tpo,pageable);
        }
        List<Question> list=pages.getContent();
        Long total=pages.getTotalElements();
        int totalPage=total.intValue()/7;
        if(total.intValue()%7!=0)totalPage+=1;
        List<QuestionResponse> questionResponses= new ArrayList<>();
        for (Question temp: list){
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
            questionResponse.setAnsCount(answerRepository.countByAnswer(temp, 1));
            questionResponses.add(questionResponse);
        }


        return new QuestionsResponse(questionResponses, page, totalPage);
    }
    public void questionDelete(Long id){
        Question question=questionSelect(id);
        if(question.getAdopt()==1){
            throw new AdoptQueException("채택된 질문으로 삭제할 수 없습니다.");
        }
        if(answerRepository.countByAnswer(question, 1)!=0){
            throw new ExistAnsException("답변이 존재하는 질문으로 삭제할 수 없습니다.");
        }
        question.setUsed(0);
        questionRepository.save(question);
    }
    public void questionUpdate(Long id, QuestionRequest questionRequest){
        Question question=questionRepository.findById(id).orElse(null);
        if(question.getAdopt()==1){
            throw new AdoptQueException("채택된 질문으로 수정할 수 없습니다.");
        }
        if(answerRepository.countByAnswer(question, 1)!=0){
            throw new ExistAnsException("답변이 존재하는 질문으로 수정할 수 없습니다.");
        }
        question.setTpo(questionRequest.getTpo());
        question.setEndDate(questionRequest.getEndDate());
        question.setComments(questionRequest.getComments());
        questionRepository.save(question);
    }
    public Question questionSelect(Long id){
        return questionRepository.findById(id).orElse(null);
    }
    public QuestionDetailResponse questionDetail(Long id, String token){
        Question question=questionRepository.findByIdAndUsed(id,1);
        if(question==null){
            throw new DelQueException("삭제된 질문입니다!");
        }
        QuestionResponse questionResponse=new QuestionResponse();
        questionResponse.setQid(question.getId());
        questionResponse.setMid(question.getMember().getId());
        questionResponse.setNickname(question.getMember().getNickname());
        questionResponse.setWeight(question.getMember().getWeight());
        questionResponse.setHeight(question.getMember().getHeight());
        questionResponse.setPostDate(question.getPostDate());
        questionResponse.setEndDate(question.getEndDate());
        questionResponse.setTpo(new OccasionDto().getTpo(question.getTpo()));
        questionResponse.setComments(question.getComments());
        questionResponse.setAnsCount(answerRepository.countByAnswer(question, 1));
        List<Answer> answer=answerRepository.findByQuestionAndUsedOrderByAdoptDescPostDateAsc(question,1);
        RestTemplate restTemplate=new RestTemplate();
        List<AnswerResponse> answerResponses=new ArrayList<>();


        HttpHeaders headers=new HttpHeaders();
        headers.set("Authorization",token);
        HttpEntity request=new HttpEntity(headers);
        for(Answer temp : answer){
            AnswerResponse answerResponse=new AnswerResponse();
            answerResponse.setNickname(temp.getMember().getNickname());
            try {
                String url="http://django-server:8000/api/v1/codi/"+temp.getCodi().toString()+"/";
                ResponseEntity<ClothDto> result=restTemplate.exchange(url, HttpMethod.GET, request, ClothDto.class);
                answerResponse.setMid(temp.getMember().getId());
                answerResponse.setAid(temp.getId());
                answerResponse.setCodi(result.getBody());
                answerResponse.setComments(result.getBody().getComments());
                answerResponse.setAdopt(temp.getAdopt());
                answerResponse.setPostDate(temp.getPostDate());
                answerResponses.add(answerResponse);
            }catch(Exception e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
            }
        }
        return new QuestionDetailResponse(questionResponse,new AnswersResponse(answerResponses));
    }
}
