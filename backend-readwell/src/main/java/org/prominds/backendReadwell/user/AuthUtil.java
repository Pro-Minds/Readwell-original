package org.prominds.backendReadwell.user;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.util.concurrent.TimeUnit;

@Component
public class AuthUtil {

    @Value("${spring.application.security.jwt.expiration}")
    private long expirationTime;

    public void setTokenInCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) TimeUnit.MILLISECONDS.toSeconds(expirationTime)); // Adjust if needed
        response.addCookie(cookie);
    }
}
