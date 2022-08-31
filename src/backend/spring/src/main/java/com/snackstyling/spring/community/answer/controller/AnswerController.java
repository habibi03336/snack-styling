package com.snackstyling.spring.community.answer.controller;

import com.snackstyling.spring.community.answer.dto.AnswerNumResponse;
import com.snackstyling.spring.community.answer.dto.AnswerRequest;
import com.snackstyling.spring.community.answer.service.AnswerService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AnswerController {
    private final AnswerService answerService;
    @ApiOperation(value="답변 등록",notes = "<strong>답변 정보를 받아 저장한다.</strong>")
    @RequestMapping(value="/api/v1/board/answer", method = RequestMethod.POST)
    public ResponseEntity<AnswerNumResponse> postAnswer(@RequestBody AnswerRequest answerRequest){
        return ResponseEntity.ok().body(answerService.postAnswer(answerRequest));
    }

    @ApiOperation(value="답변 상세 조회",notes = "<strong>답변을 상세하게 봅니다.</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.GET)
    public ResponseEntity detailAnswer(@PathVariable(value="id") String id) {
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="답변 삭제",notes = "<strong>답변을 삭제합니다.</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteAnswer(@PathVariable(value="id") Long id){
        answerService.deleteAnswer(id);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="답변 수정",notes = "<strong>답변을 수정합니다.</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.PATCH)
    public ResponseEntity updateAnswer(@PathVariable(value="id") Long id, @RequestBody AnswerRequest answerRequest){
        answerService.updateAnswer(id,answerRequest);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="답변 채택",notes = "<strong>답변을 채택합니다.</strong>")
    @RequestMapping(value="/api/v1/board/answer/adopt/{id}", method = RequestMethod.PATCH)
    public ResponseEntity adoptAnswer(@PathVariable(value="id") Long id){
        answerService.adoptAnswer(id);
        return ResponseEntity.ok().build();
    }
}

