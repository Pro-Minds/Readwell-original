package org.prominds.backendReadwell.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.prominds.backendReadwell.exceptions.TokenExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = extractTokenFromCookies(request.getCookies());

        if (jwt != null) {
            try {
                // Validate the token and extract email
                String email = jwtUtil.getEmailFromToken(jwt);
                if (jwtUtil.validateToken(jwt, email)) {
                    // Load user details
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    // Set authentication in the context
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (TokenExpiredException e) {
                // Handle expired token case (optional: log the error)
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                return; // Stop further processing
            } catch (Exception e) {
                // Handle other exceptions (optional: log the error)
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token.");
                return; // Stop further processing
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromCookies(Cookie[] cookies) {
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
