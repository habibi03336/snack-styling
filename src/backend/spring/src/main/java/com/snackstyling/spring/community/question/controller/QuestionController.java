package com.snackstyling.spring.community.question.controller;

import com.snackstyling.spring.community.common.dto.TpoType;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.community.question.dto.QuestionRequest;
import com.snackstyling.spring.community.question.dto.QuestionNumResponse;
import com.snackstyling.spring.community.question.dto.QuestionsResponse;
import com.snackstyling.spring.community.question.service.QuestionService;
import com.snackstyling.spring.dto.QuestionListDto;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestionController {
    private final QuestionService questionService;
    @ApiOperation(value="질문등록",notes = "<strong>질문을 등록한다.</strong>")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.POST)
    public ResponseEntity<QuestionNumResponse> postQuestion(@RequestBody QuestionRequest questionRequest) {
        return ResponseEntity.ok().body(questionService.questionPost(questionRequest));
    }
    @ApiOperation(value="질문 목록 불러오기",notes = "<strong>페이지네이션을 통해 부분적으로 질문을 불러온다.</strong>")
    @ApiImplicitParam(name = "page", value = "페이지 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.GET)
    public ResponseEntity<QuestionsResponse> loadQuestion(@RequestParam("page") Integer page){
        return ResponseEntity.ok().body(questionService.questionList(page));
    }
    @ApiOperation(value="질문 삭제",notes = "<strong>질문을 삭제한다.</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteQuestion(@PathVariable(value="id") Long id){
        questionService.questionDelete(id);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="질문 수정",notes = "<strong>질문을 수정한다.</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.PATCH)
    public ResponseEntity updateQuestion(@PathVariable(value="id") Long id, @RequestBody QuestionRequest questionRequest){
        questionService.questionUpdate(id, questionRequest);
        return ResponseEntity.ok().build();
    }
}
