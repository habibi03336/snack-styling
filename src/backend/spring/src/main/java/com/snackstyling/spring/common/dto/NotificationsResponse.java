package com.snackstyling.spring.common.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class NotificationsResponse {
    private List<NotificationResponse> notificationResponses;
    public NotificationsResponse(List<NotificationResponse> notificationResponses){
        this.notificationResponses=notificationResponses;
    }
}
