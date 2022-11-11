package com.snackstyling.spring.community.question.repository;

import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByMemberAndUsed(Member member, Integer used);
    Page<Question> findAllByUsed(Integer used, Pageable pageable);
    Page<Question> findAllByUsedAndAdopt(Integer used, Integer adopt, Pageable pageable);
    Page<Question> findAllByUsedAndTpo(Integer used, Integer tpo, Pageable pageable);
    Page<Question> findAllByUsedAndAdoptAndTpo(Integer used, Integer adopt, Integer tpo, Pageable pageable);
    Question findByIdAndUsed(Long id, Integer used);
}
