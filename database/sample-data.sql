-- =====================================================
-- Sample / Demo Data
-- =====================================================
-- Use demo data only.
-- Do not insert real passwords or personal information.

INSERT INTO USERS (
    FULL_NAME,
    FATHER_NAME,
    EMAIL,
    PHONE,
    DOB,
    GENDER,
    CNIC,
    ADDRESS,
    USERNAME,
    PASSWORD,
    ROLE
)
VALUES (
    'Demo Student',
    'Demo Father',
    'student@example.com',
    '03000000000',
    DATE '2005-01-01',
    'Male',
    '00000-0000000-0',
    'Demo Address',
    'demo_student',
    'DEMO_BCRYPT_HASH',
    'STUDENT'
);


INSERT INTO USERS (
    FULL_NAME,
    FATHER_NAME,
    EMAIL,
    PHONE,
    DOB,
    GENDER,
    CNIC,
    ADDRESS,
    USERNAME,
    PASSWORD,
    ROLE
)
VALUES (
    'Demo Admin',
    'Demo Father',
    'admin@example.com',
    '03000000001',
    DATE '2000-01-01',
    'Male',
    '00000-0000000-1',
    'Demo Address',
    'demo_admin',
    'DEMO_BCRYPT_HASH',
    'ADMIN'
);


INSERT INTO ACTIVITY_LOGS (
    USERNAME,
    ROLE,
    ACTION,
    DESCRIPTION,
    ACTIVITY_TIME
)
VALUES (
    'demo_admin',
    'ADMIN',
    'LOGIN',
    'Demo administrator login',
    CURRENT_TIMESTAMP
);

COMMIT;