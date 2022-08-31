package com.snackstyling.spring.community.question.repository;

import com.snackstyling.spring.community.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
