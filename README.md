# Student Information & Management System

A full-stack **Student Information & Management System** designed to manage student and admin accounts, student information, authentication, and dashboard statistics.

## 📌 Project Overview

The Student Information & Management System allows administrators and students to securely access the system according to their roles.

The system provides:

* Student registration and login
* Admin login
* Student information management
* Admin dashboard
* Student statistics
* Male and female student statistics
* User and role management
* Password change functionality
* Session-based authentication
* Oracle Database integration
* Secure password storage using BCrypt

---

## 🛠️ Technologies Used

### Frontend

* Next.js
* React.js
* JavaScript
* Tailwind CSS
* React Hot Toast

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* Maven

### Database

* Oracle Database XE
* Oracle SQL Developer
* JDBC
* Oracle JDBC Driver

### Development Tools

* IntelliJ IDEA
* Visual Studio Code
* Git
* GitHub
* Postman

---

## ✨ Features

### 🔐 Authentication

* User login
* Admin login
* Role-based redirection
* Session-based authentication
* Session timeout handling
* Logout functionality

### 👨‍🎓 Student Management

* Student registration
* Student login
* Student dashboard
* Student information display
* Password change
* Password strength checking

### 👨‍💼 Admin Dashboard

* Admin dashboard
* Total users count
* Total students count
* Total admins count
* Male student count
* Female student count
* Student information reports

### 🔒 Security

* BCrypt password hashing
* Session management
* Protected application functionality
* Environment variables for database credentials
* Database credentials are not stored directly in GitHub

---

## 🗄️ Database

The application uses **Oracle Database XE**.

Main database information includes:

* Users
* Students
* Admins
* Roles
* Authentication information

The application connects to Oracle using JDBC and Spring Data JPA.

Example database configuration:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
```

---

## ⚙️ Environment Variables

Database credentials are stored using environment variables instead of being written directly into `application.properties`.

Required variables:

```text
DB_USERNAME=STUDENTDB
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

Do **not** upload your real database password to GitHub.

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/mazahirm2005-cpu/student-management-system.git
```

### 2. Open the Backend

Open the Spring Boot project in IntelliJ IDEA.

### 3. Configure Oracle Database

Make sure Oracle Database XE is running.

Create/configure the database user and make sure the required tables are available.

### 4. Configure Environment Variables

Set:

```text
DB_USERNAME=STUDENTDB
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

### 5. Start Spring Boot

Run the Spring Boot application.

The backend runs on:

```text
http://localhost:8080
```

### 6. Start the Next.js Frontend

Open the frontend project and run:

```bash
npm install
npm run dev
```

The frontend normally runs on:

```text
http://localhost:3000
```

---

## 📊 Dashboard

The admin dashboard provides statistics such as:

* Total Users
* Total Students
* Total Admins
* Male Students
* Female Students

It also provides student information and management functionality.

---

## 📸 Screenshots

### Login Page

<img width="470" height="687" alt="image" src="https://github.com/user-attachments/assets/61925376-f321-45bc-a47d-be8c38e74d6e" />


### Student Dashboard

<img width="871" height="678" alt="image" src="https://github.com/user-attachments/assets/2f807b57-881b-4ce2-ba3e-04b9c05a8d4a" />


### Admin Dashboard

<img width="1900" height="777" alt="image" src="https://github.com/user-attachments/assets/6cd3265c-c813-4615-99d8-c2b12319e112" />

<img width="1871" height="547" alt="image" src="https://github.com/user-attachments/assets/76e51d08-f53f-47cb-8b28-0cd168806385" />


### Student Management

<img width="1024" height="465" alt="image" src="https://github.com/user-attachments/assets/3573d237-7e0f-468b-9247-1d0621fd1989" />

<img width="925" height="772" alt="image" src="https://github.com/user-attachments/assets/2ddede58-307c-4be1-9001-6a5fe78b34ed" />

<img width="616" height="803" alt="image" src="https://github.com/user-attachments/assets/e1a8128c-98d5-46f6-96bd-8a51155e0860" />


### Change Password

<img width="553" height="637" alt="image" src="https://github.com/user-attachments/assets/5ee6a424-f3ac-4073-8cc9-d1d2b1887f93" />


---

## 🔮 Future Improvements

Planned improvements include:

* Student profile management
* Advanced search and filtering
* Pagination
* Attendance management
* Marks and GPA management
* Course management
* Teacher management
* Student reports
* Export reports to PDF/Excel
* Improved role-based authorization
* Better validation and error handling
* Deployment to a production server
* Cloud database integration
* Responsive UI improvements

---

## 👨‍💻 Developer

**Muhammad Mazahir**

BS Information Technology Student

Technologies of interest:

* Software Development
* Java
* Spring Boot
* Next.js
* Database Management
* Artificial Intelligence & Machine Learning

---

## 📄 License

This project is developed for educational and learning purposes.
