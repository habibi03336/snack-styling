package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByLogin(Login login);
}
