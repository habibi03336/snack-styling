package com.snackstyling.spring.member.repository;

import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByLogin(Login login);
    Boolean existsByNickname(String nickname);

}
