package com.example.studentloginsystem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;

public class RegisterRequest {

    private String fullName;
    private String fatherName;

    @NotBlank(message = "Phone number is required.")
    @Pattern(
            regexp = "^\\+?[0-9]{10,15}$",
            message = "Please enter a valid phone number."
    )
    private String phone;
    private String email;
    private LocalDate dob;
    private String gender;
    @NotBlank(message = "CNIC is required.")
    @Pattern(
            regexp = "^[0-9]{5}-[0-9]{7}-[0-9]$",
            message = "CNIC format should be 12345-1234567-1"
    )
    private String cnic;
    private String address;
    private String username;
    private String password;



    public RegisterRequest() {
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }


    public String getEmail() {
        return email;
    }

    // CHANGE HERE
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getCnic() {
        return cnic;
    }

    public void setCnic(String cnic) {
        this.cnic = cnic;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}