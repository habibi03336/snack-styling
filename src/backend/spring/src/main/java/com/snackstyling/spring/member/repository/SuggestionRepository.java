package com.snackstyling.spring.member.repository;

import com.snackstyling.spring.member.domain.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

}
