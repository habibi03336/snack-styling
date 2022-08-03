package com.snackstyling.spring.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.snackstyling.spring.domain.Answer;
import com.snackstyling.spring.domain.Question;
import com.snackstyling.spring.dto.Coordination;
import com.snackstyling.spring.service.CommunityService;
import com.snackstyling.spring.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommunityController {
    private final CommunityService communityService;
    private final LoginService loginService;

    @RequestMapping(value="/board/question", method = RequestMethod.POST)
    public ResponseEntity quePost(@RequestBody Map<String, Object> req){
        Question question=new Question();
        question.setMember(loginService.selectMember(Long.parseLong(req.get("id").toString())));
        question.setTpo((Integer) req.get("tpo"));
        question.setEndDate(LocalDate.parse(req.get("end_date").toString(), DateTimeFormatter.ISO_DATE));
        question.setPostDate(LocalDateTime.now());
        question.setComments(req.get("comments").toString());
        System.out.println(question.getPostDate());
        System.out.println(question.getEndDate());
        communityService.postQuestion(question);
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value="/board/answer", method = RequestMethod.POST)
    public ResponseEntity ansPost(@RequestBody Map<String, Object> req){
        Answer answer= new Answer();
        answer.setMember(loginService.selectMember(Long.parseLong(req.get("mid").toString())));
        answer.setQuestion(communityService.selectQuestion(Long.parseLong(req.get("qid").toString())));;
        answer.setPostDate(LocalDateTime.now());
        answer.setComments(req.get("comments").toString());
        //codi는 django server에 있으므로 조회해야함
        RestTemplate restTemplate=new RestTemplate();
        String url="민수주소";
        ResponseEntity<Coordination> result=restTemplate.postForEntity(url,req,Coordination.class);
        answer.setCodi(result.getBody().getId());
        communityService.postAnswer(answer);
        return new ResponseEntity(HttpStatus.OK);
    }
    @RequestMapping(value="/board/load", method = RequestMethod.GET)
    public String loadBoard(@RequestParam("page") Integer page){
        List<Question> list=communityService.loadQuestion(page).getContent();
        JsonArray ja=new JsonArray();
        for(Question temp : list){
            JsonObject obj = new JsonObject();
            obj.addProperty("id",temp.getId());
            obj.addProperty("weight",temp.getMember().getWeight());
            obj.addProperty("height",temp.getMember().getHeight());
            //나중에 body_tpye 추가
            obj.addProperty("postDate",temp.getPostDate().toString());
            obj.addProperty("endDate",temp.getEndDate().toString());
            obj.addProperty("tpo",temp.getTpo());
            obj.addProperty("comments",temp.getComments());
            ja.add(obj);
        }
        return ja.toString();
    }
    @RequestMapping(value="/board/detail", method = RequestMethod.GET)
    public String detailBoard(@RequestParam("id") Long id){
        Question question=communityService.selectQuestion(id);
        JsonObject total=new JsonObject();
        JsonObject que=new JsonObject();
        que.addProperty("id",question.getId());
        que.addProperty("id",question.getMember().getWeight());
        que.addProperty("id",question.getMember().getHeight());
        que.addProperty("id",question.getPostDate().toString());
        que.addProperty("id",question.getEndDate().toString());
        que.addProperty("id",question.getTpo());
        que.addProperty("id",question.getComments());
        total.addProperty("que",que.toString());

        JsonArray ans=new JsonArray();
        List<Answer> answer=communityService.detailQuestion(question);
        for(Answer temp : answer){
            JsonObject obj = new JsonObject();
            obj.addProperty("nickname",temp.getMember().getNickname());
            // 랭크는 좀있다가 추가
            // API 호출 필요 이 때 codi id를 넘겨주면 된다
            obj.addProperty("height",temp.getMember().getHeight());
            obj.addProperty("comments",temp.getComments());
            ans.add(obj);
        }
        total.addProperty("ans",ans.toString());
        return total.toString();
    }
}
