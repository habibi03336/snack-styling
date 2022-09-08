package com.snackstyling.spring.community.question.controller;

import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.community.question.dto.QuestionDetailResponse;
import com.snackstyling.spring.community.question.dto.QuestionRequest;
import com.snackstyling.spring.community.question.dto.QuestionNumResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.community.question.service.QuestionService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestionController {
    private final QuestionService questionService;
    private final JwtService jwtService;
    @ApiOperation(value="질문등록",notes = "<strong>질문을 등록한다.</strong>")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.POST)
    public ResponseEntity<QuestionNumResponse> postQuestion(@RequestHeader("Authorization") String token, @RequestBody QuestionRequest questionRequest) {
        return ResponseEntity.ok().body(questionService.questionPost(token, questionRequest));
    }
    @ApiOperation(value="질문 목록 불러오기",notes = "<strong>페이지네이션을 통해 부분적으로 질문을 불러온다.</strong>")
    @ApiImplicitParam(name = "page", value = "페이지 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.GET)
    public ResponseEntity<QuestionsResponse> loadQuestion(@RequestHeader("Authorization") String token, @RequestParam("page") Integer page){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(questionService.questionList(page));
    }
    @ApiOperation(value="질문 상세 내용 보기",notes = "<strong>질문을 클릭하면 상세 내용 및 답변을 볼 수 있다.</strong>")
    @ApiImplicitParam(name = "id", value = "질문 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="api/v1/board/question/{id}", method = RequestMethod.GET)
    public ResponseEntity<QuestionDetailResponse> detailQuestion(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id) {
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(questionService.questionDetail(id));
    }
    @ApiOperation(value="질문 삭제",notes = "<strong>질문을 삭제한다.</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteQuestion(@PathVariable(value="id") Long id){
        questionService.questionDelete(id);
        return ResponseEntity.ok().build();
    }
    /*
    @ApiOperation(value="질문 수정",notes = "<strong>질문을 수정한다.</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.PATCH)
    public ResponseEntity updateQuestion(@PathVariable(value="id") Long id, @RequestBody QuestionRequest questionRequest){
        questionService.questionUpdate(id, questionRequest);
        return ResponseEntity.ok().build();
    }
    */
}
