package com.snackstyling.spring.common.dto;

import lombok.Getter;

@Getter
public class NotificationResponse {
    private Long nid;
    private Long qid;
    private int type;
    public NotificationResponse(Long nid, Long qid, int type){
        this.nid=nid;
        this.qid=qid;
        this.type=type;
    }
}
