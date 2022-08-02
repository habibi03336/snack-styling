package com.snackstyling.spring.service;

import com.snackstyling.spring.domain.Question;
import com.snackstyling.spring.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final QuestionRepository questionRepository;

    public void postQuestion(Question question){ questionRepository.save(question);}
}
