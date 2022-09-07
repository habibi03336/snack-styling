package com.snackstyling.spring.common.service;

import com.snackstyling.spring.common.domain.Notification;
import com.snackstyling.spring.common.dto.NotificationResponse;
import com.snackstyling.spring.common.dto.NotificationsResponse;
import com.snackstyling.spring.common.repository.NotificationRepository;
import com.snackstyling.spring.member.domain.Member;
import com.snackstyling.spring.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notifyRepository;
    private final MemberService memberService;
    public void saveNotification(Notification notification){
        notifyRepository.save(notification);
    }
    public NotificationsResponse selectNotification(Long id){
        Member member=memberService.memberSelect(id);
        List<Notification> notifications=notifyRepository.findByMemberAndUsedOrderByIdDesc(member,0);
        List<NotificationResponse> notificationResponses=new ArrayList<>();
        for(Notification notification : notifications){
            notificationResponses.add(new NotificationResponse(notification.getId(),
                    notification.getQuestion().getId(),
                    notification.getType()));
        }
        return new NotificationsResponse(notificationResponses);
    }
    public void readNotification(Long id){
        Notification notification=notifyRepository.findById(id).orElse(null);
        notification.setUsed(1);
        notifyRepository.save(notification);
    }
    public void readAllNotification(Long id){
        Member member=memberService.memberSelect(id);
        List<Notification> notifications=notifyRepository.findByMemberAndUsed(member,0);
        for(Notification notification : notifications){
            notification.setUsed(1);
            notifyRepository.save(notification);
        }
    }
}
