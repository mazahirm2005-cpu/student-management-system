package com.example.studentloginsystem.repository;

import com.example.studentloginsystem.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository
        extends JpaRepository<ActivityLog, Integer> {

}