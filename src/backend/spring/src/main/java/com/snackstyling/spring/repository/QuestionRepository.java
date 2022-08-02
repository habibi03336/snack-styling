package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
