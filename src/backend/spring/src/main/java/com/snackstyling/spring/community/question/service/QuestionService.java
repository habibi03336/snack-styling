package com.snackstyling.spring.community.question.service;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.answer.dto.AnswerResponse;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import com.snackstyling.spring.community.answer.repository.AnswerRepository;
import com.snackstyling.spring.community.common.dto.ClothDto;
import com.snackstyling.spring.community.common.dto.CodiDto;
import com.snackstyling.spring.community.common.dto.OccasionDto;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.*;
import com.snackstyling.spring.community.question.exception.DelQueException;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<Question> loadQuestion(Integer page){
        Pageable pageable = PageRequest.of(page,7, Sort.by("postDate").descending());
        return questionRepository.findAllByUsed(1,pageable).getContent();
    }
    public QuestionsResponse questionList(Integer page){
        List<Question> list=loadQuestion(page);
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
            questionResponse.setAnsCount(answerRepository.countByAnswer(temp));
            questionResponses.add(questionResponse);
        }
        return new QuestionsResponse(questionResponses);
    }
    public void questionDelete(Long id){
        Question question=questionSelect(id);
        question.setUsed(0);
        questionRepository.save(question);
    }
    public void questionUpdate(Long id, QuestionRequest questionRequest){
        Question question=questionRepository.findById(id).orElse(null);
        question.setTpo(questionRequest.getTpo());
        question.setEndDate(questionRequest.getEndDate());
        question.setComments(questionRequest.getComments());
        questionRepository.save(question);
    }
    public Question questionSelect(Long id){
        return questionRepository.findById(id).orElse(null);
    }
    public QuestionDetailResponse questionDetail(Long id){
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
        questionResponse.setAnsCount(answerRepository.countByAnswer(question));

        List<Answer> answer=answerRepository.findByQuestionOrderByAdoptDescPostDateAsc(question);
        RestTemplate restTemplate=new RestTemplate();
        List<AnswerResponse> answerResponses=new ArrayList<>();
        for(Answer temp : answer){
            AnswerResponse answerResponse=new AnswerResponse();
            answerResponse.setNickname(temp.getMember().getNickname());
            try {
                String url="http://backend-django:8000/api/v1/codi/"+temp.getCodi().toString()+"/";
                ResponseEntity<ClothDto> result=restTemplate.getForEntity(url, ClothDto.class);
                answerResponse.setClothDto(result.getBody());
                answerResponse.setComments(temp.getComments());
                answerResponse.setAdopt(temp.getAdopt());
                answerResponses.add(answerResponse);
            }catch(Exception e){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "django service connection error");
            }
        }
        return new QuestionDetailResponse(questionResponse,new AnswersResponse(answerResponses));
    }
}
