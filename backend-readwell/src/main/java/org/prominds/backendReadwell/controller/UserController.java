package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.User;
import org.prominds.backendReadwell.user.UserLoginDto;
import org.prominds.backendReadwell.user.UserRegistrationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://10.49.63.86:3000", allowCredentials = "true")
public class UserController extends BaseUserController {

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto, BindingResult bindingResult) {
        return registerUser(registrationDto, false, bindingResult);
    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody UserLoginDto loginDto, HttpServletResponse response) {
        return super.userLogin(loginDto, response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyUserOtp(@Valid @RequestBody OtpVerificationDto otpDto, BindingResult bindingResult, HttpServletResponse response) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid OTP data");
        }
        return super.verifyOtp(otpDto, response);
    }

    @GetMapping("/user/details")
    public ResponseEntity<User> getUserDetails(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsernameFromToken(token);
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
}

