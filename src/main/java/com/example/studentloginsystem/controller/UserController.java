package com.example.studentloginsystem.controller;

import com.example.studentloginsystem.dto.AdminRegisterRequest;
import com.example.studentloginsystem.dto.AdminStatsResponse;
import com.example.studentloginsystem.dto.ChangePasswordRequest;
import com.example.studentloginsystem.dto.RegisterRequest;
import com.example.studentloginsystem.dto.RegisterResponse;
import com.example.studentloginsystem.dto.StudentResponse;
import com.example.studentloginsystem.dto.UpdateProfileRequest;
import com.example.studentloginsystem.entity.ActivityLog;
import com.example.studentloginsystem.service.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

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
public class UserController {

    @Autowired
    private UserService userService;

    // Register
    @PostMapping("/register")
    public RegisterResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return userService.register(request);
    }

    // Get Student using Session
    @GetMapping("/student")
    public ResponseEntity<StudentResponse> getStudent(HttpSession session) {

        String username = (String) session.getAttribute("username");

        System.out.println("Session ID: " + session.getId());
        System.out.println("Username in Session: " + username);

        // Session expired
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        StudentResponse response = userService.getStudent(username);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(response);
    }

    // Update Profile
    @PutMapping("/student/update")
    public String updateProfile(
            @RequestBody UpdateProfileRequest request) {

        return userService.updateProfile(request);
    }

    // Change Password
    @PutMapping("/change-password")
    public String changePassword(
            @RequestBody ChangePasswordRequest request) {

        return userService.changePassword(request);
    }

    @GetMapping("/students")
    public List<StudentResponse> getAllStudents() {

        return userService.getAllStudents();

    }

    @GetMapping("/student/{username}")
    public StudentResponse getStudentByUsername(
            @PathVariable String username) {

        return userService.getStudent(username);

    }

    @DeleteMapping("/student/{username}")
    public String deleteStudent(
            @PathVariable String username) {

        return userService.deleteStudent(username);

    }

    @GetMapping("/students/count")
    public Long getStudentCount() {

        return userService.getStudentCount();

    }

    @GetMapping("/admin/stats")
    public ResponseEntity<?> getAdminStats(HttpSession session) {

        System.out.println("================================");
        System.out.println("Session ID : " + session.getId());
        System.out.println("Username   : " + session.getAttribute("username"));
        System.out.println("Role       : " + session.getAttribute("role"));

        String role = (String) session.getAttribute("role");

        if (role == null || !role.equals("ADMIN")) {
            System.out.println("403 RETURNED");
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Access Denied");
        }

        System.out.println("200 RETURNED");

        return ResponseEntity.ok(userService.getAdminStats());
    }

    @PostMapping("/admin/register")
    public RegisterResponse registerAdmin(
            @Valid @RequestBody AdminRegisterRequest request,
            HttpSession session) {


        System.out.println("========== REGISTER ADMIN ==========");
        System.out.println("Session ID : " + session.getId());
        System.out.println("Username   : " + session.getAttribute("username"));
        System.out.println("Role       : " + session.getAttribute("role"));
        System.out.println("====================================");

        String role = (String) session.getAttribute("role");

        if (role == null || !role.equals("ADMIN")) {
            throw new RuntimeException("Access Denied");
        }

        return userService.registerAdmin(request);

    }


}