package org.prominds.backendReadwell.otp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private GeneratedOtpRepository generatedOtpRepository;

    @Value("${spring.application.security.jwt.expiration}")
    private long otpExpiration;

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // 6-digit OTP
        return String.valueOf(otp);
    }

    public void sendOtp(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Readwell Platform Registration - OTP Code");
        message.setText(String.format("Welcome to the Readwell platform! Use the OTP code %s to complete your login process.\n\n"
                + "Please note, this code will expire in %d minutes.\n\n"
                + "Login URL: http://localhost/api/admin/login\n\n"
                + "Thank you for registering!", otp, TimeUnit.MILLISECONDS.toMinutes(otpExpiration)));
        mailSender.send(message);
    }

    public boolean validateOtp(String email, String otp) {
        GeneratedOtp generatedOtp = generatedOtpRepository.findByEmail(email);
        if (generatedOtp != null && generatedOtp.getOtp().equals(otp)) {
            // delete the OTP after successful verification
            generatedOtpRepository.delete(generatedOtp);
            return true;
        }
        return false;
    }
}