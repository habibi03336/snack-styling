package com.snackstyling.spring.common.repository;

import com.snackstyling.spring.common.domain.Token;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token,String> {
}
