package com.example.studentloginsystem.service;

import com.example.studentloginsystem.entity.ActivityLog;
import com.example.studentloginsystem.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void saveLog(
            String username,
            String role,
            String action,
            String description
    ) {

        ActivityLog log = new ActivityLog();

        log.setUsername(username);
        log.setRole(role);
        log.setAction(action);
        log.setDescription(description);

        log.setActivityTime(
                new Timestamp(System.currentTimeMillis())
        );

        activityLogRepository.save(log);

    }

}