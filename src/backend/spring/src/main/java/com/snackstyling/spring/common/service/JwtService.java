package com.snackstyling.spring.common.service;

import com.snackstyling.spring.common.domain.Token;
import com.snackstyling.spring.common.dto.AcTokenResponse;
import com.snackstyling.spring.common.dto.TokenDto;
import com.snackstyling.spring.common.exception.*;
import com.snackstyling.spring.common.repository.TokenRepository;
import com.snackstyling.spring.login.domain.Login;
import com.snackstyling.spring.login.repository.LoginRepository;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.token.secret.access}")
    private String ac_secret_key;
    @Value("${jwt.token.secret.refresh}")
    private String re_secret_key;
    private Long accessExpired= Duration.ofMinutes(30).toMillis(); //30분
    private Long refreshExpired=Duration.ofDays(7).toMillis(); //1주
    private final TokenRepository tokenRepository;
    private final LoginRepository loginRepository;
    public String createJsonWebToken( Map<String, Object> headers,  Map<String, Object> payloads,Long expired){
        Date now = new Date();
        return Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+refreshExpired))
                .signWith(SignatureAlgorithm.HS256,re_secret_key)
                .compact();
    }
    public TokenDto createToken(Login member) {
        /*jwt-header setting*/
        Map<String, Object> headers=new HashMap<>();
        headers.put("typ","JWT");
        headers.put("alg","HS256");
        /*jwt-header payload(pk,email)*/
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("Key", member.getId());
        payloads.put("Email",member.getEmail());
        String refresh=createJsonWebToken(headers,payloads, refreshExpired);
        String access=createJsonWebToken(headers,payloads, accessExpired);
        tokenRepository.save(new Token(member.getEmail(),refresh));
        return new TokenDto(refresh,access);
    }
    public Long getMemberId(String token){
        return Long.parseLong(Jwts.parser().setSigningKey(ac_secret_key)
                .parseClaimsJws(token)
                .getBody()
                .get("Key").toString());
    }
    public void validateToken(String token){
        try {
            Jwts.parser().setSigningKey(ac_secret_key).parseClaimsJws(token);
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
        String email=Jwts.parser().setSigningKey(re_secret_key)
                .parseClaimsJws(token)
                .getBody()
                .get("Email").toString();
        Token temp=tokenRepository.findById(email).orElse(null);
        if(temp.getRefreshToken()==null){
            throw new TokenExpiredException("Token has expired");
        }
        if(!temp.getRefreshToken().equals(token)){
            throw new TokenMatchException("Invalid token");
        }
        Login user=loginRepository.findByEmail(email);
        Map<String, Object> headers=new HashMap<>();
        headers.put("typ","JWT");
        headers.put("alg","HS256");
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("Key", user.getId());
        payloads.put("Email",email);
        return new AcTokenResponse(createJsonWebToken(headers,payloads,accessExpired));
    }
}