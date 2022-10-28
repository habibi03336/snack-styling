package com.snackstyling.spring.member.controller;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.member.dto.MemberRequest;
import com.snackstyling.spring.member.dto.MemberInfResponse;
import com.snackstyling.spring.member.dto.RanksResponse;
import com.snackstyling.spring.member.dto.SuggestionResquest;
import com.snackstyling.spring.member.repository.SuggestionRepository;
import com.snackstyling.spring.member.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;
    @ApiOperation(value="맴버정보 입력",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장</strong>")
    @RequestMapping(value="/api/v1/profile", method = RequestMethod.POST)
    public ResponseEntity inputMember(@RequestHeader("Authorization") String token, @RequestBody MemberRequest memberRequest){
        memberService.memberInsert(jwtService.getMemberId(token),memberRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="멤버정보 확인",notes = "<strong>마이페이지로 회원 정보를 제공한다.</strong>")
    @RequestMapping(value="/api/v1/profile", method = RequestMethod.GET)
    public ResponseEntity<MemberInfResponse> inquiryMember(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(memberService.memberMyPage(jwtService.getMemberId(token)));
    }
    @ApiOperation(value="맴버 질문 조회",notes = "<strong>내가 등록한 질문을 조회한다.</strong>")
    @RequestMapping(value="/api/v1/profile/questions", method = RequestMethod.GET)
    public ResponseEntity<QuestionsResponse> inquiryAnswer(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(memberService.memberQuestions(jwtService.getMemberId(token)));
    }
    @ApiOperation(value="맴버 답변 조회",notes = "<strong>내가 등록한 답변을 조회한다.</strong>")
    @RequestMapping(value="/api/v1/profile/answers", method = RequestMethod.GET)
    public ResponseEntity<QuestionsResponse> inquiryQuestion(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(memberService.memberAnswers(jwtService.getMemberId(token)));
    }
    @ApiOperation(value="건의 사항",notes = "<strong>익명인척 하면서 맴버 정보까지 저장해버리기~</strong>")
    @RequestMapping(value="/api/v1/profile/suggestions", method = RequestMethod.POST)
    public ResponseEntity suggestion(@RequestHeader("Authorization") String token, @RequestBody SuggestionResquest suggestionResquest){
        jwtService.validateToken(token);
        memberService.memberSuggestion(jwtService.getMemberId(token), suggestionResquest.getContents());
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="랭킹 보기",notes = "<strong>상위 10명 랭킹 봐 버리기~</strong>")
    @RequestMapping(value="/api/v1/profile/ranks", method = RequestMethod.GET)
    public ResponseEntity<RanksResponse> rankMember(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(memberService.memberRank());
    }
    /*
    @ApiOperation(value="맴버정보 수정",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장한다.</strong>")
    @RequestMapping(value="/api/v1/users/{id}", method = RequestMethod.PATCH)
    public ResponseEntity UpdateUsers(@PathVariable(value="id") String id){
        return new ResponseEntity(HttpStatus.OK);
    }
    */
}
