package com.snackstyling.spring.community.question.controller;

import com.snackstyling.spring.community.common.dto.ClothDto;
import com.snackstyling.spring.community.common.dto.OccasionDto;
import com.snackstyling.spring.community.answer.domain.Answer;
import com.snackstyling.spring.community.question.domain.Question;
import com.snackstyling.spring.dto.*;
import com.snackstyling.spring.community.answer.service.CommunityService;
import com.snackstyling.spring.login.service.LoginService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommunityController {
    private final CommunityService communityService;
    private final LoginService loginService;


    @ApiOperation(value="질문 상세 내용 보기",notes = "<strong>질문을 클릭하면 상세 내용 및 답변을 볼 수 있다.</strong>")
    @ApiImplicitParam(name = "id", value = "질문 번호", required = true, dataType = "int", defaultValue = "None")
    @RequestMapping(value="api/v1/board/question/{id}", method = RequestMethod.GET)
    public QuestionDetailDto detailBoard(@PathVariable(value="id") String id){
        Question question=communityService.selectQuestion(Long.parseLong(id));
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
        que.setTpo(new OccasionDto().getTpo(question.getTpo()));
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
            String url="http://backend-django:8000/api/v1/codi/"+temp.getCodi().toString()+"/";
            ResponseEntity<ClothDto> result=restTemplate.getForEntity(url, ClothDto.class);
            obj.setTop(result.getBody().getTop());
            obj.setBottom(result.getBody().getBottom());
            obj.setCap(result.getBody().getCap());
            obj.setFootwear(result.getBody().getFootwear());
            obj.setComments(temp.getComments());
            ans.add(obj);
        }
        questionDetail.setAns(ans);
        return questionDetail;
    }

}
