\# Database Setup



The Student Information \& Management System uses Oracle Database XE.



\## Database



\- Database: Oracle Database XE

\- Host: localhost

\- Port: 1521

\- SID: XE

\- Schema/User: STUDENTDB



\## Tables



\### USERS



Stores student and administrator account information.



Important columns include:



\- ID

\- FULL\_NAME

\- FATHER\_NAME

\- EMAIL

\- PHONE

\- DOB

\- GENDER

\- CNIC

\- ADDRESS

\- USERNAME

\- PASSWORD

\- ROLE



The `ROLE` column is used to distinguish between different user types such as `STUDENT` and `ADMIN`.



\### ACTIVITY\_LOGS



Stores application activity information.



Columns include:



\- ID

\- USERNAME

\- ROLE

\- ACTION

\- DESCRIPTION

\- ACTIVITY\_TIME



\## Setup



1\. Start Oracle Database XE.

2\. Connect to the `STUDENTDB` user using SQL Developer.

3\. Run `schema.sql`.

4\. Run `sample-data.sql` if demo data is required.

5\. Configure the Spring Boot environment variables:



DB\_USERNAME=STUDENTDB

DB\_PASSWORD=YOUR\_DATABASE\_PASSWORD



Never upload the real database password to GitHub.



\## Application Connection



The Spring Boot application connects using Oracle JDBC:



spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE

spring.datasource.username=${DB\_USERNAME}

spring.datasource.password=${DB\_PASSWORD}

spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

