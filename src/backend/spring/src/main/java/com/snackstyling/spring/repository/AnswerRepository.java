package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
}
