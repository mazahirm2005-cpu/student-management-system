package com.example.studentloginsystem.service;

import com.example.studentloginsystem.dto.LoginRequest;
import com.example.studentloginsystem.entity.User;
import com.example.studentloginsystem.repository.UserRepository;
import com.example.studentloginsystem.response.LoginResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ActivityLogService activityLogService;

    public LoginService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ActivityLogService activityLogService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.activityLogService = activityLogService;
    }

    public LoginResponse login(LoginRequest loginRequest,
                               HttpSession session) {

        Optional<User> user =
                userRepository.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {

            if (passwordEncoder.matches(
                    loginRequest.getPassword(),
                    user.get().getPassword())) {

                session.setAttribute(
                        "username",
                        user.get().getUsername()
                );

                session.setAttribute(
                        "role",
                        user.get().getRole()
                );

                session.setAttribute(
                        "loginTime",
                        new Date()
                );

                session.setMaxInactiveInterval(120);

                System.out.println("Session ID: " + session.getId());
                System.out.println("Username: " + session.getAttribute("username"));
                System.out.println("Login Time: " + session.getAttribute("loginTime"));
                System.out.println("Session Timeout: " + session.getMaxInactiveInterval());
                System.out.println("Role: " + session.getAttribute("role"));

                activityLogService.saveLog(
                        user.get().getUsername(),
                        user.get().getRole(),
                        "LOGIN",
                        "User Logged In Successfully"
                );

                return new LoginResponse(
                        "Login Successful",
                        user.get().getUsername(),
                        user.get().getRole()
                );
            }
        }

        return new LoginResponse("Invalid Username or Password");
    }
}