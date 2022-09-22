package com.snackstyling.spring.common.dto;

import lombok.Getter;

@Getter
public class NotificationResponse {
    private Long nid;
    private Long qid;
    private int type;
    private String tpo;
    private String user;
    private String other;
    public NotificationResponse(Long nid, Long qid, int type, String tpo,
                                String user, String other){
        this.nid=nid;
        this.qid=qid;
        this.type=type;
        this.tpo=tpo;
        this.user=user;
        this.other=other;
    }
}
