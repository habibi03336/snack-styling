package com.snackstyling.spring.community.answer.controller;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.answer.dto.AnswerNumResponse;
import com.snackstyling.spring.community.answer.dto.AnswerRequest;
import com.snackstyling.spring.community.answer.service.AnswerService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board/answer")
public class AnswerController {
    private final AnswerService answerService;
    private final JwtService jwtService;
    @ApiOperation(value="답변 등록",notes = "<strong>답변 정보를 받아 저장한다.</strong>")
    @PostMapping("")
    public ResponseEntity<AnswerNumResponse> postAnswer(@RequestHeader("Authorization") String token, @RequestBody AnswerRequest answerRequest){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(answerService.postAnswer(token, answerRequest));
    }
   @ApiOperation(value="답변 삭제",notes = "<strong>답변을 삭제합니다.</strong>")
   @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id){
        jwtService.validateToken(token);
        answerService.deleteAnswer(id);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value="답변 수정",notes = "<strong>답변을 수정합니다.</strong>")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateAnswer(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id, @RequestBody AnswerRequest answerRequest){
        jwtService.validateToken(token);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="답변 채택",notes = "<strong>답변을 채택합니다.</strong>")
    @PatchMapping("/adopt/{id}")
    public ResponseEntity<Void> adoptAnswer(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id){
        jwtService.validateToken(token);
        answerService.adoptAnswer(id, token);
        return ResponseEntity.ok().build();
    }
}

