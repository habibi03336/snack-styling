package com.snackstyling.spring.controller;

import com.snackstyling.spring.domain.Question;
import com.snackstyling.spring.service.CommunityService;
import com.snackstyling.spring.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
}
