package com.snackstyling.spring.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.snackstyling.spring.domain.Answer;
import com.snackstyling.spring.domain.Question;
import com.snackstyling.spring.dto.*;
import com.snackstyling.spring.service.CommunityService;
import com.snackstyling.spring.service.LoginService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.CodingErrorAction;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommunityController {
    private final CommunityService communityService;
    private final LoginService loginService;

    @ApiOperation(value="질문 등록",notes = "<strong>질문 정보를 받아 저장한다.</strong>")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.POST)
    public CodiDto quePost(@RequestBody QuestionDto questionDto) {
        Question question=new Question();
        question.setMember(loginService.selectMember(questionDto.getId()));
        question.setTpo(questionDto.getTpo());
        question.setEndDate(questionDto.getEnd_date());
        question.setPostDate(LocalDateTime.now());
        question.setComments(questionDto.getComments());
        question.setAdopt(0);
        communityService.postQuestion(question);
        CodiDto res=new CodiDto();
        res.setId(question.getId());
        return res;
    }
    @ApiOperation(value="질문 목록 불러오기",notes = "<strong>페이지네이션을 통해 부분적으로 질문을 불러온다.</strong>")
    @ApiImplicitParam(name = "page", value = "페이지 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="/api/v1/board/question", method = RequestMethod.GET)
    public List<QuestionListDto> loadBoard(@RequestParam("page") Integer page){
        List<Question> list=communityService.loadQuestion(page).getContent();
        List<QuestionListDto> listDto=new ArrayList<>();
        for (Question temp: list){
            QuestionListDto one_list=new QuestionListDto();
            one_list.setQid(temp.getId());
            one_list.setMid(temp.getMember().getId());
            one_list.setNickname(temp.getMember().getNickname());
            one_list.setWeight(temp.getMember().getWeight());
            one_list.setHeight(temp.getMember().getHeight());
            one_list.setPost_date(temp.getPostDate());
            one_list.setEnd_date(temp.getEndDate());
            one_list.setTpo(new TpoType().getTpo(temp.getTpo()));
            one_list.setComments(temp.getComments());
            one_list.setAns_count(communityService.countAnswer(temp));
            listDto.add(one_list);
        }
        return listDto;
    }
    @ApiOperation(value="질문 상세 내용 보기",notes = "<strong>질문을 클릭하면 상세 내용 및 답변을 볼 수 있다.</strong>")
    @ApiImplicitParam(name = "id", value = "질문 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="api/v1/board/question/{id}", method = RequestMethod.GET)
    public QuestionDetailDto detailBoard(@RequestParam("id") Long id){
        Question question=communityService.selectQuestion(id);
        QuestionDetailDto questionDetail=new QuestionDetailDto();
        //질문
        QuestionListDto que=new QuestionListDto();
        que.setQid(question.getId());
        que.setMid(question.getMember().getId());
        que.setNickname(question.getMember().getNickname());
        que.setWeight(question.getMember().getWeight());
        que.setHeight(question.getMember().getHeight());
        que.setPost_date(question.getPostDate());
        que.setEnd_date(question.getEndDate());
        que.setTpo(new TpoType().getTpo(question.getTpo()));
        que.setComments(question.getComments());
        que.setAns_count(communityService.countAnswer(question));
        questionDetail.setQue(que);

        //답변
        List<Answer> answer=communityService.detailQuestion(question);
        RestTemplate restTemplate=new RestTemplate();
        List<AnswerListDto> ans=new ArrayList<>();
        for(Answer temp : answer){
            AnswerListDto obj=new AnswerListDto();
            obj.setNickname(temp.getMember().getNickname());
            String url="http://backend-django:8000/api/codi/"+temp.getCodi().toString()+"/";
            ResponseEntity<ClothDto> result=restTemplate.getForEntity(url, ClothDto.class);
            obj.setTop(result.getBody().getTop());
            obj.setBottom(result.getBody().getBottom());
            obj.setComments(temp.getComments());
            System.out.println(result.getBody().getTop());
            ans.add(obj);
        }
        questionDetail.setAns(ans);
        return questionDetail;
    }
    @ApiOperation(value="질문 삭제",notes = "<strong>질문 삭제</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.DELETE)
    public ResponseEntity queDelete(@RequestParam Long id){
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="질문 수정",notes = "<strong>질문 수정</strong>")
    @RequestMapping(value="/api/v1/board/question/{id}", method = RequestMethod.PATCH)
    public ResponseEntity queUpdate(@RequestParam Long id){
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="답변 등록",notes = "<strong>답변 정보를 받아 저장한다.</strong>")
    @RequestMapping(value="/api/v1/board/answer", method = RequestMethod.POST)
    public ResponseEntity ansPost(@RequestBody AnswerDto answerDto){
        Answer answer= new Answer();
        answer.setMember(loginService.selectMember(answerDto.getMid()));
        answer.setQuestion(communityService.selectQuestion(answerDto.getQid()));
        answer.setPostDate(LocalDateTime.now());
        answer.setComments(answerDto.getComments());
        //codi는 django server에 있으므로 조회해야함
        RestTemplate restTemplate=new RestTemplate();
        Map<String, Integer> codi=new HashMap<>();
        codi.put("top",answerDto.getTop());
        codi.put("bottom",answerDto.getBottom());
        codi.put("cap",answerDto.getCap());
        codi.put("footwear",answerDto.getFootwear());
        String url="http://backend-django:8000/api/codi/";
        ResponseEntity<CodiDto> result=restTemplate.postForEntity(url,codi, CodiDto.class);
        answer.setCodi(result.getBody().getId());
        communityService.postAnswer(answer);
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="답변 조회",notes = "<strong>답변 조회</strong>")
    @RequestMapping(value="/api/v1/board/answer/", method = RequestMethod.GET)
    public ResponseEntity ansSelect(@RequestParam Long id) {
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="답변 하나 조회",notes = "<strong>답변 하나 조회</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.GET)
    public ResponseEntity ansSelectOne(@RequestParam Long id) {
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="답변 삭제",notes = "<strong>답변 삭제</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.DELETE)
    public ResponseEntity ansDelete(@RequestParam Long id){
        return new ResponseEntity(HttpStatus.OK);
    }
    @ApiOperation(value="답변 수정",notes = "<strong>답변 수정</strong>")
    @RequestMapping(value="/api/v1/board/answer/{id}", method = RequestMethod.PATCH)
    public ResponseEntity ansUpdate(@RequestParam Long id){
        return new ResponseEntity(HttpStatus.OK);
    }
}
