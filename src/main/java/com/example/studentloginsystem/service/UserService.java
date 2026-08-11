package com.example.studentloginsystem.service;

import com.example.studentloginsystem.dto.ChangePasswordRequest;
import com.example.studentloginsystem.dto.RegisterRequest;
import com.example.studentloginsystem.dto.RegisterResponse;
import com.example.studentloginsystem.dto.StudentResponse;
import com.example.studentloginsystem.dto.UpdateProfileRequest;
import com.example.studentloginsystem.entity.User;
import com.example.studentloginsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.ArrayList;

import org.springframework.transaction.annotation.Transactional;

import com.example.studentloginsystem.dto.AdminStatsResponse;
import com.example.studentloginsystem.dto.AdminRegisterRequest;
import com.example.studentloginsystem.entity.ActivityLog;
import com.example.studentloginsystem.repository.ActivityLogRepository;

import com.example.studentloginsystem.dto.AdminRegisterRequest;
import com.example.studentloginsystem.entity.ActivityLog;
import com.example.studentloginsystem.repository.ActivityLogRepository;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ActivityLogRepository activityLogRepository;



    // Register
    // Register
    public RegisterResponse register(RegisterRequest request) {

        System.out.println("====================================");
        System.out.println("Register API Called");
        System.out.println("Email : " + request.getEmail());
        System.out.println("Username : " + request.getUsername());

        // Username Check
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());

        System.out.println("Username Exists : " + existingUser.isPresent());

        if (existingUser.isPresent()) {
            return new RegisterResponse("Username already exists.");
        }

        // Email Check
        Optional<User> existingEmail = userRepository.findByEmail(request.getEmail());

        System.out.println("Email Exists : " + existingEmail.isPresent());

        if (existingEmail.isPresent()) {
            return new RegisterResponse("Email already exists.");
        }

        User user = new User();
        user.setRole("STUDENT");

        user.setFullName(request.getFullName());
        user.setFatherName(request.getFatherName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setCnic(request.getCnic());
        user.setAddress(request.getAddress());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        System.out.println("User Saved Successfully");

        // Webhook
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> payload = new HashMap<>();

        payload.put("event", "STUDENT_CREATED");
        payload.put("studentName", user.getFullName());
        payload.put("email", user.getEmail());
        payload.put("username", user.getUsername());

        try {

            restTemplate.postForObject(
                    "http://localhost:9090/webhook",
                    payload,
                    String.class
            );

            System.out.println("Webhook Sent Successfully");

        } catch (Exception e) {

            System.out.println("Webhook Failed : " + e.getMessage());

        }

        System.out.println("====================================");

        return new RegisterResponse("Account Created Successfully");
    }

    // Get Student Details
    public StudentResponse getStudent(String username) {

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return null;
        }

        User u = user.get();

        StudentResponse response = new StudentResponse();

        response.setFullName(u.getFullName());
        response.setFatherName(u.getFatherName());
        response.setEmail(u.getEmail());
        response.setPhone(u.getPhone());
        response.setDob(u.getDob());
        response.setGender(u.getGender());
        response.setCnic(u.getCnic());
        response.setAddress(u.getAddress());
        response.setUsername(u.getUsername());

        return response;
    }

    // Update Profile
    public String updateProfile(UpdateProfileRequest request) {

        Optional<User> user = userRepository.findByUsername(request.getUsername());

        if (user.isPresent()) {

            User existingUser = user.get();

            existingUser.setFullName(request.getFullName());
            existingUser.setFatherName(request.getFatherName());
            existingUser.setEmail(request.getEmail());
            existingUser.setPhone(request.getPhone());
            existingUser.setDob(request.getDob());
            existingUser.setGender(request.getGender());
            existingUser.setCnic(request.getCnic());
            existingUser.setAddress(request.getAddress());

            userRepository.save(existingUser);

            return "Profile Updated Successfully";
        }

        return "User Not Found";
    }

    // Change Password
    public String changePassword(ChangePasswordRequest request) {

        Optional<User> user = userRepository.findByUsername(request.getUsername());

        if (user.isEmpty()) {
            return "User Not Found";
        }

        User existingUser = user.get();

        if (!passwordEncoder.matches(request.getOldPassword(), existingUser.getPassword())) {
            return "Current password is incorrect.";
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return "New password and confirm password do not match.";
        }

        if (passwordEncoder.matches(request.getNewPassword(), existingUser.getPassword())) {
            return "New password cannot be the same as the current password.";
        }

        existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(existingUser);

        return "Password changed successfully.";
    }

    public List<StudentResponse> getAllStudents() {

        List<User> users = userRepository.findByRoleOrderByIdAsc("STUDENT");

        List<StudentResponse> students = new ArrayList<>();

        for (User u : users) {

            StudentResponse response = new StudentResponse();

            response.setFullName(u.getFullName());
            response.setFatherName(u.getFatherName());
            response.setEmail(u.getEmail());
            response.setPhone(u.getPhone());
            response.setDob(u.getDob());
            response.setGender(u.getGender());
            response.setCnic(u.getCnic());
            response.setAddress(u.getAddress());
            response.setUsername(u.getUsername());

            students.add(response);
        }

        return students;
    }

    @Transactional
    public String deleteStudent(String username) {

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return "Student Not Found";
        }

        userRepository.delete(user.get());

        return "Student Deleted Successfully";
    }

    public Long getStudentCount() {

        return userRepository.count();

    }

    public AdminStatsResponse getAdminStats() {

        AdminStatsResponse stats = new AdminStatsResponse();

        stats.setTotalStudents(
                userRepository.countByRole("STUDENT")
        );

        stats.setTotalAdmins(
                userRepository.countByRole("ADMIN")
        );

        stats.setMaleStudents(
                userRepository.countByGender("Male")
        );

        stats.setFemaleStudents(
                userRepository.countByGender("Female")
        );

        return stats;
    }

    public RegisterResponse registerAdmin(AdminRegisterRequest request) {

        Optional<User> existingUser =
                userRepository.findByUsername(request.getUsername());

        if (existingUser.isPresent()) {
            return new RegisterResponse("Username already exists.");
        }

        Optional<User> existingEmail =
                userRepository.findByEmail(request.getEmail());

        if (existingEmail.isPresent()) {
            return new RegisterResponse("Email already exists.");
        }

        User user = new User();

        user.setRole("ADMIN");

        user.setFullName(request.getFullName());

        // Empty fields (Admin ke liye required nahi)
        user.setFatherName("");
        user.setDob(null);
        user.setGender("");
        user.setCnic("");
        user.setAddress("");

        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setUsername(request.getUsername());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);

        return new RegisterResponse("Admin Created Successfully");
    }

    public List<ActivityLog> getAllLogs() {

        return activityLogRepository.findAll();

    }
}