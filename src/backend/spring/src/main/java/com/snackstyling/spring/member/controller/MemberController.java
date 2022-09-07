package com.snackstyling.spring.member.controller;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.answer.dto.AnswersResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.member.dto.MemberRequest;
import com.snackstyling.spring.member.dto.MemberInfResponse;
import com.snackstyling.spring.member.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;
    @ApiOperation(value="맴버정보 입력",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장</strong>")
    @RequestMapping(value="/api/v1/profile", method = RequestMethod.POST)
    public ResponseEntity inputMember(@RequestBody MemberRequest memberRequest){
        memberService.memberInsert(memberRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="멤버정보 확인",notes = "<strong>마이페이지로 회원 정보를 제공한다.</strong>")
    @RequestMapping(value="/api/v1/profile", method = RequestMethod.GET)
    public ResponseEntity<MemberInfResponse> inquiryMember(@RequestHeader("Authorization") String token,
                                                           @RequestParam("users") Long users){
        jwtService.validateToken(token, users);
        return ResponseEntity.ok().body(memberService.memberMyPage(users));
    }
    @ApiOperation(value="맴버 질문 조회",notes = "<strong>내가 등록한 질문을 조회한다.</strong>")
    @RequestMapping(value="/api/v1/profile/questions", method = RequestMethod.GET)
    public ResponseEntity<QuestionsResponse> inquiryAnswer(@RequestParam("users") Long users){
        return ResponseEntity.ok().body(memberService.memberQuestions(users));
    }
    @ApiOperation(value="맴버 답변 조회",notes = "<strong>내가 등록한 답변을 조회한다.</strong>")
    @RequestMapping(value="/api/v1/profile/answers", method = RequestMethod.GET)
    public ResponseEntity<AnswersResponse> inquiryQuestion(@RequestParam("users") Long users){
        return ResponseEntity.ok().body(memberService.memberAnswers(users));
    }
    /*
    @RequestMapping(value="/api/v1/users", method = RequestMethod.PATCH)
    public ResponseEntity updateMember(@RequestBody MemberRequest memberRequest){
        memberService.memberUpdate(memberRequest);
        return ResponseEntity.ok().build();
    }
    */
    /*
    @ApiOperation(value="맴버정보 수정",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장한다.</strong>")
    @RequestMapping(value="/api/v1/users/{id}", method = RequestMethod.PATCH)
    public ResponseEntity UpdateUsers(@PathVariable(value="id") String id){
        return new ResponseEntity(HttpStatus.OK);
    }
    */
}
