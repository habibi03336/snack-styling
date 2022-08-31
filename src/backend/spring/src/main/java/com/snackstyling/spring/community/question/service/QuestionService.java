package com.snackstyling.spring.community.question.service;

import com.snackstyling.spring.community.common.dto.TpoType;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.QuestionRequest;
import com.snackstyling.spring.community.question.dto.QuestionNumResponse;
import com.snackstyling.spring.community.question.dto.QuestionResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.community.question.repository.QuestionRepository;
import com.snackstyling.spring.dto.QuestionListDto;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    public QuestionNumResponse questionPost(QuestionRequest questionRequest){
        Question question=new Question();
        question.setMember(memberService.selectMember(questionRequest.getId()));
        question.setTpo(questionRequest.getTpo());
        question.setEndDate(questionRequest.getEndDate());
        question.setPostDate(LocalDateTime.now());
        question.setComments(questionRequest.getComments());
        questionRepository.save(question);
        return new QuestionNumResponse(question.getId());
    }
    public List<Question> loadQuestion(Integer page){
        Pageable pageable = PageRequest.of(page,7, Sort.by("postDate").descending());
        return questionRepository.findAll(pageable).getContent();
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
            questionResponse.setTpo(new TpoType().getTpo(temp.getTpo()));
            questionResponse.setComments(temp.getComments());
            //one_list.setAns_count(communityService.countAnswer(temp));
            questionResponses.add(questionResponse);
        }
        return new QuestionsResponse(questionResponses);
    }
    public void questionDelete(Long id){
        questionRepository.deleteById(id);
    }
    public void questionUpdate(Long id, QuestionRequest questionRequest){
        Question question=questionRepository.findById(id).orElse(null);
        question.setTpo(questionRequest.getTpo());
        question.setEndDate(questionRequest.getEndDate());
        question.setComments(questionRequest.getComments());
        questionRepository.save(question);
    }
}
