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
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final String SECRET_KEY="kimmjkingwang1jjangand10zonejar";
    private static Long accessExpired= Duration.ofMinutes(30).toMillis(); //30분
    private static Long refreshExpired=Duration.ofDays(7).toMillis(); //1주
    private final TokenRepository tokenRepository;
    private final LoginRepository loginRepository;
    private final MemberRepository memberRepository;

    //access token
    public TokenDto createToken(String email) {

        Map<String, Object> headers=new HashMap<>();
        headers.put("typ","JWT");
        headers.put("alg","HS256");

        Login user=loginRepository.findByEmail(email);
        Member member=memberRepository.findByLogin(user);

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("Key", member.getId());
        payloads.put("Email",email);

        Date now = new Date();
        String refresh=Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+refreshExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
        String access= Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact();
        System.out.println(Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(access)
                .getBody()
                .get("Key"));

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
                .get("Email").toString();
    }
    public void validateToken(String token, Long id){
        Long saveId=Long.parseLong(Jwts.parser().setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .get("Key").toString());
        if(id!=saveId){
            throw new MemberIdException("멤버와 토큰이 일치하지 않습니다.");
        }
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

        if(temp.getRefreshToken()==null){
            throw new TokenExpiredException("Token has expired");
        }
        if(!temp.getRefreshToken().equals(token)){
            throw new TokenMatchException("Invalid token");
        }
        Map<String, Object> headers=new HashMap<>();
        headers.put("typ","JWT");
        headers.put("alg","HS256");

        Login user=loginRepository.findByEmail(email);
        Member member=memberRepository.findByLogin(user);

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("Key", member.getId());
        payloads.put("Email",email);
        Date now = new Date();
        return new AcTokenResponse(Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+accessExpired))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .compact());
    }
}