-- Update admin password to simpler one for testing
UPDATE users 
SET password = '$2a$10$eKL4g828sIcQjCyevE861.RBzGI538pEslMmkaCcEfhotgAeADyZG' 
WHERE email = 'alfath@upi.edu';
