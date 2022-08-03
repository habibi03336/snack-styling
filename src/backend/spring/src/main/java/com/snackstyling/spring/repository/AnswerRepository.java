package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Answer;
import com.snackstyling.spring.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findByQuestion(Question question);
}
