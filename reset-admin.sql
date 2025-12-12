DELETE FROM users WHERE email = 'alfath@upi.edu';
INSERT INTO users (id, email, name, password, role, created_at) VALUES ('admin-001', 'alfath@upi.edu', 'Admin AL-FATH', '$2a$10$eKL4g828sIcQjCyevE861.RBzGI538pEslMmkaCcEfhotgAeADyZG', 'admin', datetime('now'));
