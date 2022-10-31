package com.snackstyling.spring.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,PATCH";
    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://www.snackstyling.com")
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","));
        /*
        addMapping : 해당 설정을 적요할 API 범위 선택 =-> /** 전체 적용
        allowedOrigins: Origin을 허용할 범위 선택 (생략 시 *와 같은 의미로 전체 허용됨)
        allowedMethods: 허용할 HTTP 메서드 선택
        exposedHeader: 서버에서 반환할 헤더 지정
        */
    }

}
