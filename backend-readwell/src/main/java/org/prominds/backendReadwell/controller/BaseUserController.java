package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.prominds.backendReadwell.otp.GeneratedOtp;
import org.prominds.backendReadwell.otp.GeneratedOtpRepository;
import org.prominds.backendReadwell.otp.OtpService;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.security.JwtUtil;
import org.prominds.backendReadwell.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Validated
public class BaseUserController {

    @Autowired
    protected UserService userService;

    @Autowired
    protected JwtUtil jwtUtil;

    @Autowired
    protected OtpService otpService;

    @Autowired
    protected GeneratedOtpRepository generatedOtpRepository;

    @Autowired
    protected AuthUtil authUtil;

    protected static final Logger logger = LoggerFactory.getLogger(BaseUserController.class);

    // Common method for user registration
    protected ResponseEntity<String> registerUser(UserRegistrationDto registrationDto, boolean isAdmin, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid registration data");
        }

        User newUser = new User();
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(new BCryptPasswordEncoder().encode(registrationDto.getPassword()));
        newUser.setAdmin(isAdmin);

        userService.saveUser(newUser);

        String otp = otpService.generateOtp();
        GeneratedOtp generatedOtp = new GeneratedOtp();
        generatedOtp.setEmail(registrationDto.getEmail());
        generatedOtp.setOtp(otp);
        generatedOtpRepository.save(generatedOtp);

        otpService.sendOtp(registrationDto.getEmail(), otp);

        return ResponseEntity.ok("User registered successfully. Please check your email for the OTP.");
    }

    // Common method for OTP verification
    protected ResponseEntity<String> verifyOtp(OtpVerificationDto otpDto, HttpServletResponse response) {
        boolean isValid = otpService.validateOtp(otpDto.getEmail(), otpDto.getOtp());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
        }

        User user = userService.getUserByEmail(otpDto.getEmail());
        String token = jwtUtil.generateToken(user);
        authUtil.setTokenInCookie(token, response);

        return ResponseEntity.ok("Token generated and stored in cookie.");
    }

    // Common method for user login
    protected ResponseEntity<String> userLogin(UserLoginDto loginDto, HttpServletResponse response) {
        logger.info("Login attempt for email: {}", loginDto.getEmail());

        User user = userService.getUserByEmail(loginDto.getEmail());
        if (user == null) {
            logger.warn("User not found for email: {}", loginDto.getEmail());
            throw new UsernameNotFoundException("User not found with email: " + loginDto.getEmail());
        }

        boolean passwordMatches = userService.matchesPassword(loginDto.getPassword(), user.getPassword());
        if (!passwordMatches) {
            logger.warn("Invalid password for email: {}", loginDto.getEmail());
            throw new BadCredentialsException("Invalid password");
        }

        String token = jwtUtil.generateToken(user);
        authUtil.setTokenInCookie(token, response);

        return ResponseEntity.ok("Token generated and stored in cookie.");
    }
}
