package com.snackstyling.spring.common.service;

import com.snackstyling.spring.common.dto.TokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    private static final String SECRET_KEY="kimmjkingwang1jjangand10zonejar";
    //access token
    public String createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email); // JWT payload 에 저장되는 정보단위
        //claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        Long accessExpired=1000*60L*30L; //30분
        //Long refreshExpired=1000*60L*60L*24L*30L*3L; //3주

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
        /*
        1. 로그인 성공
        2. JWT 토근을 2개 생성하는 것임(주기가 긴 것은 refresh, 주기 짧은 것은 access)
        3. Map 형태로 받아서 RefreshToken은 따로 데이터베이스에 저장한다.
        4. Access Token은 Body로 전송, set-cookie로 Refresh Token 전송
        5. 예외처리 필요
           5.1 access token 만료시 에러 -> 프론트에서 refresh 보냄
           5.2 refresh token 만료시 에러 -> 강제 로그아웃 시킴
         */
    }
    public String getUser(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public String resolveToken(HttpServletRequest request){
        return request.getHeader("Authorization");
    }
    public void validateToken(String token){

    }
}
