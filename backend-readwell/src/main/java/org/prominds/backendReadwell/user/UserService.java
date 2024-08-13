package org.prominds.backendReadwell.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(UserRegistrationDto registrationDto) {
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword())); // Encrypt password
        user.setAdmin(false);
        userRepository.save(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public User getUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//    public boolean matchesPassword(String rawPassword, String encodedPassword) {
//        return passwordEncoder.matches(rawPassword, encodedPassword);
//    }
}
