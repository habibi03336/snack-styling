package com.snackstyling.spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.snackstyling.spring.community.question.dto.QuestionRequest;
import com.snackstyling.spring.login.dto.AuthRequest;
import com.snackstyling.spring.member.dto.SuggestionResquest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class ApplicationTests {
	@Autowired
	private MockMvc mvc;
	@Autowired
	private ObjectMapper objectMapper;
	@Test
	@DisplayName("로그인")
	public void testA() throws Exception{
		/*
		사용자가 이메일과 패스워드를 입력하여 로그인을 진행한다.
		성공시 토큰이 발급된다.
		 */
		AuthRequest authRequest=new AuthRequest();
		authRequest.setEmail("test@naver.com");
		authRequest.setPwd("test9700!");
		mvc.perform(post("/api/v1/accounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(authRequest)))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("전체 게시글 조회")
	public void testB() throws Exception{
		/*
		사용자가 전체 게시글을 조회한다.
		 */
		mvc.perform(get("/api/v1/board/question")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4")
						.param("page","1"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("데이트 게시글 조회")
	public void testC() throws Exception{
		/*
		사용자가 필터링 기능을 통해 데이트에 해당하는 게시글을
		조회하고자 한다.
		 */
		mvc.perform(get("/api/v1/board/question")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4")
						.param("page","1")
						.param("tpo","2"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("데이트 게시글, 채택 된 것 조회")
	public void testD() throws Exception{
		/*
		사용자가 필터링 기능을 통해 데이트에 해당하면서
		채택 된 게시글만 조회하고자 한다.
		 */
		mvc.perform(get("/api/v1/board/question")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4")
						.param("page","1")
						.param("adopt","1")
						.param("tpo","2"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("질문등록")
	public void testE() throws Exception{
		/*
		사용자가 데이트에 입을 옷을 추천해달라는
		게시글을 올린다.
		 */
		QuestionRequest request=new QuestionRequest();
		request.setTpo(2);
		LocalDate localDate=LocalDate.now();
		request.setEndDate(localDate);
		request.setComments("Test 코드 실행입니다.");
		mvc.perform(post("/api/v1/board/question")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(request)))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("마이페이지")
	public void testF() throws Exception{
		/*
		사용자가 마이페이지를 클릭했을 때
		결과를 호출한다.
		 */
		mvc.perform(get("/api/v1/profile")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("마이페이지-질문목록")
	public void testG() throws Exception{
		/*
		사용자가 올렸던 질문 목록들을
		확인할 수 있다.
		 */
		mvc.perform(get("/api/v1/profile/questions")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("마이페이지-건의사항")
	public void testH() throws Exception{
		/*
		사용자는 우리 플랫폼을 사용하면서
		피드백을 남길 수 있다.
		 */
		SuggestionResquest suggestionResquest=new SuggestionResquest();
		suggestionResquest.setContents("test메시지 입니다.");
		mvc.perform(post("/api/v1/profile/suggestions")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(suggestionResquest)))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("알림")
	public void testI() throws Exception{
		/*
		사용자가 알림페이지를 열었을 때로
		자신에게 온 알림을 확인할 수 있다.
		 */
		mvc.perform(get("/api/v1/notifications")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("알림 모두 읽음")
	public void testJ() throws Exception{
		/*
		사용자가 알림페이지에서
		모두 읽음 처리했을 경우 호출되는 api이다.
		 */
		mvc.perform(patch("/api/v1/notifications")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("Access Token 유효성 검사")
	public void testK() throws Exception{
		/*
		Access Token 의 유효성을 검사할 수 있다.
		 */
		mvc.perform(get("/api/v1/accounts/token")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjkwMTc3MDQxLCJpYXQiOjE2NjQyNTcwNDEsIktleSI6Mn0.OnlcPtIz3ciQJu0gzL30yopZgffbalWVrC2YhbgSLO4"))
				.andExpect(status().isOk())
				.andDo(print());
	}
	@Test
	@DisplayName("Access Token 새로 발급")
	public void testL() throws Exception{
		/*
		리프레시 토큰을 비교해보고 유효하다면 새로 발급을 해준다.
		 */
		mvc.perform(post("/api/v1/accounts/token")
						.header("Authorization",
								"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjY0ODYzNDIxLCJpYXQiOjE2NjQyNTg2MjEsIktleSI6Mn0.sAwMC0WAGIil04UhiR1aQwXDeinrpQDc7WECDV9bqgo"))
				.andExpect(status().isOk())
				.andDo(print());
	}
}
