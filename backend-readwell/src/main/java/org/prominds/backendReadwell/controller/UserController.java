package org.prominds.backendReadwell.controller;

import jakarta.validation.Valid;
import org.prominds.backendReadwell.otp.GeneratedOtp;
import org.prominds.backendReadwell.otp.GeneratedOtpRepository;
import org.prominds.backendReadwell.otp.OtpService;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.User;
import org.prominds.backendReadwell.user.UserLoginDto;
import org.prominds.backendReadwell.user.UserRegistrationDto;
import org.prominds.backendReadwell.user.UserService;
import org.prominds.backendReadwell.otp.OtpService;
import org.prominds.backendReadwell.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

//    @Autowired
//    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    @Autowired
    private GeneratedOtpRepository generatedOtpRepository;

//    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@Valid @RequestBody UserRegistrationDto registrationDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid registration data");
        }

        // Register the user
        User newUser = new User();
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(new BCryptPasswordEncoder().encode(registrationDto.getPassword()));
        newUser.setAdmin(true); // Set is_admin to true

        userService.saveUser(newUser);

        // Generate OTP
        String otp = otpService.generateOtp();

        // Save OTP to the database
        GeneratedOtp generatedOtp = new GeneratedOtp();
        generatedOtp.setEmail(registrationDto.getEmail());
        generatedOtp.setOtp(otp);
        generatedOtpRepository.save(generatedOtp);

        // Send OTP via email
        otpService.sendOtp(registrationDto.getEmail(), otp);

        // Return success message
        return ResponseEntity.ok("User registered successfully. Please check your email for the OTP.");
    }

//    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
//    @PostMapping("/admin/verify-otp")
//    public ResponseEntity<String> verifyOtp(@Valid @RequestBody OtpVerificationDto otpDto, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            return ResponseEntity.badRequest().body("Invalid OTP data");
//        }
//
//        // Validate OTP using OtpService
//        boolean isValid = otpService.validateOtp(otpDto.getEmail(), otpDto.getOtp());
//        if (!isValid) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
//        }
//
//        // Generate a new JWT token for the user
//        String token = jwtUtil.generateToken(otpDto.getEmail());
//        return ResponseEntity.ok(token);
//    }
//
//    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
//    @PostMapping("/admin/login")
//    public ResponseEntity<String> adminLogin(@RequestBody UserLoginDto loginDto) {
//        logger.info("Login attempt for email: {}", loginDto.getEmail());
//
//        // Retrieve the user by email
//        User user = userService.getUserByEmail(loginDto.getEmail());
//        if (user == null) {
//            logger.warn("User not found for email: {}", loginDto.getEmail());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
//        }
//
//        logger.info("User found: {}", user.getEmail());
//
//        // Check if password matches
//        boolean passwordMatches = userService.matchesPassword(loginDto.getPassword(), user.getPassword());
//        if (!passwordMatches) {
//            logger.warn("Invalid password for email: {}", loginDto.getEmail());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
//        }
//
//        // Generate a new JWT token for the user
//        String token = jwtUtil.generateToken(user.getEmail());
//        logger.info("Login successful for email: {}", loginDto.getEmail());
//        return ResponseEntity.ok(token);
//    }
}
