package com.snackstyling.spring.common.service;

import com.snackstyling.spring.common.domain.Token;
import com.snackstyling.spring.common.dto.AcTokenResponse;
import com.snackstyling.spring.common.dto.TokenDto;
import com.snackstyling.spring.common.exception.*;
import com.snackstyling.spring.common.repository.TokenRepository;
import com.snackstyling.spring.login.dto.LoginResponse;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final String SECRET_KEY="비밀^^";
    private static Long accessExpired= Duration.ofMinutes(30).toMillis(); //30분
    private static Long refreshExpired=Duration.ofDays(7).toMillis(); //1주
    private final TokenRepository tokenRepository;

    //access token
    public TokenDto createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email); // JWT payload 에 저장되는 정보단위
        //claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();
        String refresh=Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+refreshExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
        String access= Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
        tokenRepository.save(new Token(email,refresh));
        /* 토큰 검증할 때 필요할 듯
        Token temp=tokenRepository.findById(email).orElse(null);
        System.out.println(temp.getRefreshToken()); */

        return new TokenDto(refresh,access);
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
    public AcTokenResponse refreshCompare(String token){
        // 토큰 검증할 때 필요할 듯
        String email=getUser(token);
        Token temp=tokenRepository.findById(email).orElse(null);
        System.out.println(temp.getRefreshToken());
        System.out.println(token);
        if(temp.getRefreshToken()==null){
            throw new TokenExpiredException("Token has expired");
        }
        if(!temp.getRefreshToken().equals(token)){
            throw new TokenMatchException("Invalid token");
        }
        Claims claims = Jwts.claims().setSubject(email); // JWT payload 에 저장되는 정보단위
        Date now = new Date();
        return new AcTokenResponse(Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact());
    }
}