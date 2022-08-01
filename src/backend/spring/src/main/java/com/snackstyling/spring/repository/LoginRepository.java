package com.snackstyling.spring.repository;

import com.snackstyling.spring.domain.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Long> {

}
