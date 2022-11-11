package com.snackstyling.spring.community.answer.repository;

import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findByQuestionAndUsedOrderByAdoptDescPostDateAsc(Question question, Integer used);
    @Query("SELECT COUNT(*) FROM Answer a WHERE a.question=:question and a.used=:used")
    Long countByAnswer(@Param("question") Question question, @Param("used") Integer used);

    List<Answer> findByMemberAndUsed(Member member, Integer used);

}
