package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.User;
import org.prominds.backendReadwell.user.UserLoginDto;
import org.prominds.backendReadwell.user.UserRegistrationDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/check-auth")
    public ResponseEntity<Map<String, Object>> checkAuth(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();

        String token = extractTokenFromRequest(request); // Read the token from the cookie

        if (token == null) {
            response.put("isAuthenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Extract email from the token
        String email = jwtUtil.extractUsernameFromToken(token);

        // Validate the token with the extracted email
        if (!jwtUtil.validateToken(token, email)) {
            response.put("isAuthenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = userService.getUserByEmail(email);

        if (user == null) {
            response.put("isAuthenticated", false);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        response.put("isAuthenticated", true);
        response.put("role", user.isAdmin() ? "ADMIN" : "USER");
        response.put("user", user); // Add user details to the response
        return ResponseEntity.ok(response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) { // Use the actual cookie name here
                    return cookie.getValue();
                }
            }
        }
        return null; // Token not found
    }


}
