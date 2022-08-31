package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Answer;
import com.snackstyling.spring.community.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findByQuestion(Question question);
    @Query("SELECT COUNT(*) FROM Answer a WHERE a.question=:question")
    Long getAnswerCount(@Param("question") Question question);
}
