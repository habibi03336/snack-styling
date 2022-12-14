package com.snackstyling.spring.login.service;

import com.snackstyling.spring.common.exception.ConflictException;
import com.snackstyling.spring.common.exception.ServerException;
import com.snackstyling.spring.login.domain.Certification;
import com.snackstyling.spring.login.domain.Mail;
import com.snackstyling.spring.login.dto.CompareRequest;
import com.snackstyling.spring.login.dto.ConfirmRequest;
import com.snackstyling.spring.login.repository.CertificationRepository;
import com.snackstyling.spring.login.repository.MailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {
   private final JavaMailSender mailSender;
   private final MailRepository mailRepository;
   private final CertificationRepository certificationRepository;
   @Value("${spring.mail.username}")
   private String email;
    public void sendMail(ConfirmRequest confirmRequest){
        MimeMessage message=mailSender.createMimeMessage();
        String toAddress=confirmRequest.getEmail();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");
            String id=toAddress.split("@")[0];
            String number="";
            Random rd=new Random();
            for(int i=0; i<6; i++){
                number+=String.valueOf(rd.nextInt(10));
            }
            mailRepository.save(new Mail(toAddress,number));
            String htmlStr = "<h3>안녕하세요! "+id+"님<br></h3>"+
                    "스낵스타일링 서비스에 가입해주셔서 감사합니다.<br>인증번호는 다음과 같습니다.<br></h3>"+
                    "<h1>"+number+"<h1>";
            messageHelper.setText(htmlStr, true);
            messageHelper.setTo(toAddress);
            messageHelper.setSubject("[스낵스타일링] 회원가입 인증 메일입니다.");
            messageHelper.setFrom(email,"스낵스타일링");
            mailSender.send(message);
        }catch(Exception e){
            throw new ServerException("메일 서버와 통신에 실패했습니다.");
        }
    }
    public void checkMail(CompareRequest compareRequest){
        Mail mailNumber=mailRepository.findById(compareRequest.getEmail()).orElse(null);
        if(!mailNumber.getNumber().equals(compareRequest.getNumber())){
            throw new ConflictException("인증번호가 일치하지 않습니다.");
        }
        certificationRepository.save(new Certification(compareRequest.getEmail(),1));
    }
}
