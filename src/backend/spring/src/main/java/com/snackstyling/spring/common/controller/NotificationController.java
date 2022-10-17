package com.snackstyling.spring.common.controller;

import com.snackstyling.spring.common.dto.NotificationsResponse;
import com.snackstyling.spring.common.service.JwtService;
import com.snackstyling.spring.common.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final JwtService jwtService;
    @ApiOperation(value="알람 전송",notes = "<strong>모든 알람을 출력한다.</strong>")
    @RequestMapping(value="/api/v1/notifications", method = RequestMethod.GET)
    public ResponseEntity<NotificationsResponse> notifyLoad(@RequestHeader("Authorization") String token){
        jwtService.validateToken(token);
        return ResponseEntity.ok().body(notificationService.selectNotification(jwtService.getMemberId(token)));
    }
    @ApiOperation(value="알람 읽음",notes = "<strong>답변 알람에 대한 정보</strong>")
    @RequestMapping(value="/api/v1/notifications/{id}", method = RequestMethod.PATCH)
    public ResponseEntity notifyRead(@PathVariable(value = "id") Long id){
        notificationService.readNotification(id);
        return ResponseEntity.ok().build();
    }
    @ApiOperation(value="알람 모두 읽음",notes = "<strong>답변 알람에 대한 정보</strong>")
    @RequestMapping(value="/api/v1/notifications", method = RequestMethod.PATCH)
    public ResponseEntity notifyAllRead(@RequestHeader("Authorization") String token){
        notificationService.readAllNotification(jwtService.getMemberId(token));
        return ResponseEntity.ok().build();
    }
}
