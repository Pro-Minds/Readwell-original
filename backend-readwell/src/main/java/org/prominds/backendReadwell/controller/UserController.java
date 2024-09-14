package org.prominds.backendReadwell.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.prominds.backendReadwell.admin.Klass.Klass;
import org.prominds.backendReadwell.admin.Klass.KlassService;
import org.prominds.backendReadwell.admin.question.Question;
import org.prominds.backendReadwell.admin.question.QuestionService;
import org.prominds.backendReadwell.admin.subject.Subject;
import org.prominds.backendReadwell.admin.subject.SubjectService;
import org.prominds.backendReadwell.admin.topic.Topic;
import org.prominds.backendReadwell.admin.topic.TopicService;
import org.prominds.backendReadwell.otp.OtpVerificationDto;
import org.prominds.backendReadwell.user.User;
import org.prominds.backendReadwell.user.UserLoginDto;
import org.prominds.backendReadwell.user.UserRegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://readwell-UI:3000", allowCredentials = "true")
public class UserController extends BaseUserController {

    @Autowired
    private KlassService klassService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private QuestionService questionService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto, BindingResult bindingResult) {
        logger.info("Received registration request for user: {}", registrationDto.getEmail());
        return registerUser(registrationDto, false, bindingResult);
    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody UserLoginDto loginDto, HttpServletResponse response) {
        logger.info("Received login request for user: {}", loginDto.getEmail());
        return super.userLogin(loginDto, response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyUserOtp(@Valid @RequestBody OtpVerificationDto otpDto, BindingResult bindingResult, HttpServletResponse response) {
        logger.info("Received OTP verification request for user: {}", otpDto.getEmail());
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid OTP data");
        }
        return super.verifyOtp(otpDto, response);
    }

    @GetMapping("/user/details")
    public ResponseEntity<User> getUserDetails(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsernameFromToken(token);
        logger.info("Received request for user details for: {}", email);
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

    @GetMapping("/user/klasses")
    public ResponseEntity<List<Klass>> getAllKlasses() {
        return ResponseEntity.ok(klassService.getAllKlasses());
    }

    @GetMapping("/user/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/user/topics")
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(topicService.getAllTopics());
    }

    @GetMapping("/user/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    // Fetch subjects by class ID
    @GetMapping("/user/subjects/{klassId}")
    public ResponseEntity<List<Subject>> getSubjectsByKlassId(@PathVariable Long klassId) {
        List<Subject> subjects = subjectService.getSubjectsByKlassId(klassId);
        return ResponseEntity.ok(subjects);
    }

    // Fetch topics by subject ID
    @GetMapping("/user/topics/{subjectId}")
    public ResponseEntity<List<Topic>> getTopicsBySubjectId(@PathVariable Long subjectId) {
        List<Topic> topics = topicService.getTopicsBySubjectId(subjectId);
        return ResponseEntity.ok(topics);
    }

    // Fetch questions by topic ID
    @GetMapping("/user/questions/{topicId}")
    public ResponseEntity<List<Question>> getQuestionsByTopicId(@PathVariable Long topicId) {
        List<Question> questions = questionService.getQuestionsByTopicId(topicId);
        return ResponseEntity.ok(questions);
    }

}
