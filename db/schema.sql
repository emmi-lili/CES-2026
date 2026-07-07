-- Crypto Experience Summit — Networking database schema
-- Run this in phpMyAdmin after creating your MySQL database.

CREATE TABLE IF NOT EXISTS attendees (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ticket_number VARCHAR(64) NOT NULL,
  password_hash VARCHAR(255) NULL DEFAULT NULL,
  full_name VARCHAR(120) NULL DEFAULT NULL,
  job_title VARCHAR(120) NULL DEFAULT NULL,
  workplace VARCHAR(160) NULL DEFAULT NULL,
  linkedin_url VARCHAR(255) NULL DEFAULT NULL,
  photo_path VARCHAR(255) NULL DEFAULT NULL,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ticket_number (ticket_number),
  KEY idx_visible (is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
