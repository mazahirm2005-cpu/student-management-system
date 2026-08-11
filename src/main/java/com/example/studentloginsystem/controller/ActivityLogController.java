package com.example.studentloginsystem.controller;

import com.example.studentloginsystem.entity.ActivityLog;
import com.example.studentloginsystem.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        allowCredentials = "true"
)
public class ActivityLogController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin/logs")
    public ResponseEntity<?> getLogs(HttpSession session) {

        System.out.println("========== LOGS ==========");
        System.out.println("Session ID : " + session.getId());
        System.out.println("Username   : " + session.getAttribute("username"));
        System.out.println("Role       : " + session.getAttribute("role"));

        String role = (String) session.getAttribute("role");

        if (role == null || !role.equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied");
        }

        return ResponseEntity.ok(userService.getAllLogs());
    }

}