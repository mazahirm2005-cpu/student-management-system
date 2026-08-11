package com.example.studentloginsystem.dto;

public class AdminStatsResponse {

    private long totalStudents;
    private long totalAdmins;
    private long maleStudents;
    private long femaleStudents;

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalAdmins() {
        return totalAdmins;
    }

    public void setTotalAdmins(long totalAdmins) {
        this.totalAdmins = totalAdmins;
    }

    public long getMaleStudents() {
        return maleStudents;
    }

    public void setMaleStudents(long maleStudents) {
        this.maleStudents = maleStudents;
    }

    public long getFemaleStudents() {
        return femaleStudents;
    }

    public void setFemaleStudents(long femaleStudents) {
        this.femaleStudents = femaleStudents;
    }
}