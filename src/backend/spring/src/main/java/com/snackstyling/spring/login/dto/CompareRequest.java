package com.snackstyling.spring.login.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompareRequest {
    private String email;
    private String number;
}
