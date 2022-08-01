package com.snackstyling.spring.service;

import com.snackstyling.spring.domain.Login;
import com.snackstyling.spring.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;

    public void joinUser(Login user){
        loginRepository.save(user);
    }
}
