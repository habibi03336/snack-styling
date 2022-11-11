package com.snackstyling.spring.common.repository;

import com.snackstyling.spring.common.domain.Notification;
import com.snackstyling.spring.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByMemberAndUsedOrderByIdDesc(Member member, Integer used);
    List<Notification> findByMemberAndUsed(Member member, Integer used);
}
