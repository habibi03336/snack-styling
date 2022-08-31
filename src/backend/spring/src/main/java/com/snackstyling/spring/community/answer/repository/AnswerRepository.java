package com.snackstyling.spring.community.answer.repository;

import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findByQuestionOrderByAdoptDescPostDateAsc(Question question);
    @Query("SELECT COUNT(*) FROM Answer a WHERE a.question=:question")
    Long countByAnswer(@Param("question") Question question);

}
