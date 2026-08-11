package com.example.studentloginsystem.controller;

import com.example.studentloginsystem.dto.LoginRequest;
import com.example.studentloginsystem.response.LoginResponse;
import com.example.studentloginsystem.service.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.studentloginsystem.service.ActivityLogService;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private ActivityLogService activityLogService;

    @PostMapping("/logout")
    public String logout(HttpSession session) {

        System.out.println("========== LOGOUT HIT ==========");

        String username = (String) session.getAttribute("username");
        String role = (String) session.getAttribute("role");

        System.out.println("Username = " + username);
        System.out.println("Role = " + role);

        if (username != null) {

            activityLogService.saveLog(
                    username,
                    role,
                    "LOGOUT",
                    "User Logged Out Successfully"
            );

            System.out.println("Logout Log Saved");

        }

        session.invalidate();

        return "Logged Out Successfully";
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request,
            HttpSession session) {

        System.out.println("Session Timeout = " + session.getMaxInactiveInterval());

        return loginService.login(request, session);
    }

    }