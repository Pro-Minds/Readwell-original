package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.UserLoginDto;
import org.prominds.backendReadwell.user.UserRegistrationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://readwell-UI:3000", allowCredentials = "true")
public class AdminController extends BaseUserController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@Valid @RequestBody UserRegistrationDto registrationDto, BindingResult bindingResult) {
        logger.info("Received registration request for admin: {}", registrationDto.getEmail());
        return registerUser(registrationDto, true, bindingResult);
    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody UserLoginDto loginDto, HttpServletResponse response) {
        logger.info("Received login request for admin: {}", loginDto.getEmail());
        return super.userLogin(loginDto, response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyAdminOtp(@Valid @RequestBody OtpVerificationDto otpDto, BindingResult bindingResult, HttpServletResponse response) {
        logger.info("Received OTP verification request for admin: {}", otpDto.getEmail());
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid OTP data");
        }
        return super.verifyOtp(otpDto, response);
    }
}
