-- Create admin user
-- Password: admin123

INSERT INTO users (id, email, name, password, role, created_at)
VALUES (
  'admin-001',
  'admin@upi.edu',
  'Admin Tutorial PAI',
  '$2a$10$rKZxJxH5qZQJ5YqZQJ5YqOqZQJ5YqZQJ5YqZQJ5YqZQJ5YqZQJ5Yq',
  'admin',
  CURRENT_TIMESTAMP
);
