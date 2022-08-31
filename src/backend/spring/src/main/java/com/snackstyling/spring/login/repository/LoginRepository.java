package com.snackstyling.spring.login.repository;

import com.snackstyling.spring.login.domain.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByEmail(String email);
    boolean existsByEmail(String email);
}
