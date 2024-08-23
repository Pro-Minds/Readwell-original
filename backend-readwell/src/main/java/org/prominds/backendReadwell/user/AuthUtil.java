package org.prominds.backendReadwell.user;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class AuthUtil {

    @Value("${spring.application.security.jwt.expiration}")
    private long expirationTime;

    public void setTokenInCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (expirationTime / 1000)); // Convert milliseconds to seconds
        response.addCookie(cookie);
    }
}
