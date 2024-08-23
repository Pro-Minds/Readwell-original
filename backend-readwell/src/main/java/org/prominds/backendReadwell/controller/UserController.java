package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.prominds.backendReadwell.otp.GeneratedOtp;
import org.prominds.backendReadwell.otp.GeneratedOtpRepository;
import org.prominds.backendReadwell.otp.OtpService;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.*;
import org.prominds.backendReadwell.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private OtpService otpService;

    @Autowired
    private GeneratedOtpRepository generatedOtpRepository;

    @Autowired
    private AuthUtil authUtil;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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

    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
    @PostMapping("/admin/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody OtpVerificationDto otpDto, BindingResult bindingResult, HttpServletResponse response) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid OTP data");
        }

        // Validate OTP using OtpService
        boolean isValid = otpService.validateOtp(otpDto.getEmail(), otpDto.getOtp());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
        }

        // Generate a new JWT token for the user
        User user = userService.getUserByEmail(otpDto.getEmail());
        String token = jwtUtil.generateToken(user);

        // Set token in a cookie
        authUtil.setTokenInCookie(token, response);

        return ResponseEntity.ok("Token generated and stored in cookie.");
    }

    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody UserLoginDto loginDto, HttpServletResponse response) {
        logger.info("Login attempt for email: {}", loginDto.getEmail());

        // Retrieve the user by email
        User user = userService.getUserByEmail(loginDto.getEmail());
        if (user == null) {
            logger.warn("User not found for email: {}", loginDto.getEmail());
            throw new UsernameNotFoundException("User not found with email: " + loginDto.getEmail());
        }

        logger.info("User found: {}", user.getEmail());

        // Check if password matches
        boolean passwordMatches = userService.matchesPassword(loginDto.getPassword(), user.getPassword());
        if (!passwordMatches) {
            logger.warn("Invalid password for email: {}", loginDto.getEmail());
            throw new BadCredentialsException("Invalid password");
        }

        // Generate a new JWT token for the user
        String token = jwtUtil.generateToken(user);

        // Set token in a cookie
        authUtil.setTokenInCookie(token, response);

        return ResponseEntity.ok("Token generated and stored in cookie.");
    }

    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
    @GetMapping("/admin/check-auth")
    public ResponseEntity<String> checkAuth() {
        return ResponseEntity.ok("User is authenticated");
    }

    @CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
    @PostMapping("/admin/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Invalidate the JWT token by setting its cookie to expire immediately
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // This will remove the cookie

        response.addCookie(cookie);

        return ResponseEntity.ok("Successfully logged out.");
    }



//    @PostMapping("/admin/refresh-token")
//    public ResponseEntity<String> refreshToken(@RequestHeader("Authorization") String token) {
//        if (jwtUtil.isTokenExpired(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
//        }
//        // Generate a new token
//        String email = jwtUtil.extractUsername(token);
//        User user = userService.getUserByEmail(email);
//        String newToken = jwtUtil.generateToken(user);
//        return ResponseEntity.ok(newToken);
//    }
}
