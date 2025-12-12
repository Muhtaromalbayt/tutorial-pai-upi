-- Create admin user for CMS
INSERT INTO users (id, email, name, password, role, created_at)
VALUES (
    'admin-alfath-001',
    'alfath@upi.edu',
    'Admin AL-FATH',
    '$2a$10$BcRjBuP9zFX02BdfqwjOUOsCT2Xf1bDdGTU1yz.qPOEKDjpP1fDjG',
    'admin',
    datetime('now')
);
