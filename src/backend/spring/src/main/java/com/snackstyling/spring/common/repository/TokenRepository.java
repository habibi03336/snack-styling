package com.snackstyling.spring.common.repository;

import com.snackstyling.spring.common.domain.Token;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends CrudRepository<Token,String> {
}
