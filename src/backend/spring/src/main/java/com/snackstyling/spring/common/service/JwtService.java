package com.snackstyling.spring.common.service;

import com.snackstyling.spring.common.exception.*;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET_KEY="비밀^^";
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
    public void validateToken(String token){
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        } catch (SignatureException e){
            throw new TokenSignatureException("Invalid token signature");
        } catch (MalformedJwtException e){
            throw new TokenMatchException("Invalid token");
        } catch (UnsupportedJwtException e){
            throw new TokenSupportException("Unsupported token");
        } catch (IllegalArgumentException e){
            throw new ClaimEmptyException("Token claims string is empty");
        } catch (ExpiredJwtException e){
            throw new TokenExpiredException("Token has expired");
        }
    }
}