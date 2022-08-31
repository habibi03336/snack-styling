package com.snackstyling.spring.service;

import com.snackstyling.spring.domain.Answer;
import com.snackstyling.spring.domain.Question;
import com.snackstyling.spring.repository.AnswerRepository;
import com.snackstyling.spring.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommunityService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    public void postQuestion(Question question){ questionRepository.save(question);}
    public void postAnswer(Answer answer){ answerRepository.save(answer);}
    public Question selectQuestion(Long id){
        return questionRepository.findById(id).orElse(null);
    }
    public Page<Question> loadQuestion(Integer page){
        Pageable pageable = PageRequest.of(page,7, Sort.by("postDate").descending());
        return questionRepository.findAll(pageable);
    }
    public List<Answer> detailQuestion(Question question){
        return answerRepository.findByQuestion(question);
    }
    //Count는 롱형
    public Long countAnswer(Question question){return answerRepository.getAnswerCount(question);}
}
