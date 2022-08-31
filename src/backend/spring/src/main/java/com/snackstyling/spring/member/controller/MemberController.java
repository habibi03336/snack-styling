package com.snackstyling.spring.member.controller;

import com.snackstyling.spring.member.dto.MemberRequest;
import com.snackstyling.spring.member.dto.MemberResponse;
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
    @ApiOperation(value="맴버정보 입력",notes = "<strong>회원가입 된 회원들의 정보를 입력받아 저장</strong>")
    @RequestMapping(value="/api/v1/users", method = RequestMethod.POST)
    public ResponseEntity inputMember(@RequestBody MemberRequest memberRequest){
        memberService.memberInsert(memberRequest);
        return ResponseEntity.ok().build();
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
