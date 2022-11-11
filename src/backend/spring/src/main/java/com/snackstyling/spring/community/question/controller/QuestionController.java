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
@RequestMapping("/api/v1/board/question")
public class QuestionController {
    private final QuestionService questionService;
    private final JwtService jwtService;
    @ApiOperation(value="질문등록",notes = "<strong>질문을 등록한다.</strong>")
    @PostMapping("")
    public ResponseEntity<QuestionNumResponse> postQuestion(@RequestHeader("Authorization") String token, @RequestBody QuestionRequest questionRequest) {
        return ResponseEntity.ok().body(questionService.questionPost(token, questionRequest));
    }
    @ApiOperation(value="질문 목록 불러오기",notes = "<strong>페이지네이션을 통해 부분적으로 질문을 불러온다.</strong>")
    @GetMapping("")
    public ResponseEntity<QuestionsResponse> loadAdoptQuestion(@RequestHeader("Authorization") String token, @RequestParam("page") Integer page,
                                                               @RequestParam(value="adopt", required = false, defaultValue = "-1") Integer adopt,
                                                               @RequestParam(value="tpo", required = false, defaultValue = "-1") Integer tpo){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(questionService.questionList(page-1, adopt, tpo));
    }
    @ApiOperation(value="질문 상세 내용 보기",notes = "<strong>질문을 클릭하면 상세 내용 및 답변을 볼 수 있다.</strong>")
    @ApiImplicitParam(name = "id", value = "질문 번호", required = true, dataType = "int", defaultValue = "None")
    @GetMapping("/{id}")
    public ResponseEntity<QuestionDetailResponse> detailQuestion(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id) {
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(questionService.questionDetail(id, token));
    }
    @ApiOperation(value="질문 삭제",notes = "<strong>질문을 삭제한다.</strong>")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable(value="id") Long id){
        questionService.questionDelete(id);
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value="질문 수정",notes = "<strong>질문을 수정한다.</strong>")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateQuestion(@RequestHeader("Authorization") String token, @PathVariable(value="id") Long id, @RequestBody QuestionRequest questionRequest){
        jwtService.validateToken(token);
        questionService.questionUpdate(id, questionRequest);
        return ResponseEntity.ok().build();
    }

}
