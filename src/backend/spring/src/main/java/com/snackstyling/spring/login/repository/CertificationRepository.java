package com.snackstyling.spring.login.repository;

import com.snackstyling.spring.login.domain.Certification;
import com.snackstyling.spring.login.domain.Mail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends CrudRepository<Certification,String> {
}
