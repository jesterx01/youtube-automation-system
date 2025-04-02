-- YouTube Otomasyon Sistemi - Test Verileri

-- Admin kullanıcısı (şifre: admin123)
INSERT INTO users (username, email, password, first_name, last_name, role)
VALUES ('admin', 'admin@example.com', '$2b$10$ZOdmZ7Z9FgR6J1XvU1Jk1uLz7qjmL6vV1kEJ6J5J.J5J5J5J5J5', 'Admin', 'User', 'admin');

-- Test kullanıcısı (şifre: test123)
INSERT INTO users (username, email, password, first_name, last_name, role)
VALUES ('test', 'test@example.com', '$2b$10$ZOdmZ7Z9FgR6J1XvU1Jk1uLz7qjmL6vV1kEJ6J5J.J5J5J5J5J5', 'Test', 'User', 'user');

-- Test kanal
INSERT INTO channels (channel_id, title, description, thumbnail_url)
VALUES ('UC1234567890', 'Test Channel', 'This is a test channel for development', 'https://via.placeholder.com/150');

-- Kullanıcı-Kanal ilişkisi
INSERT INTO user_channels (user_id, channel_id, role)
VALUES (1, 1, 'owner'), (2, 1, 'editor');

-- İçerik planlama
INSERT INTO content_planning (channel_id, title, description, content_type, keywords, target_audience, status, created_by)
VALUES 
(1, 'Introduction to Python Programming', 'A beginner-friendly tutorial on Python basics', 'tutorial', 'python, programming, beginner', 'beginners, students', 'draft', 1),
(1, 'Advanced JavaScript Concepts', 'Deep dive into advanced JavaScript features', 'tutorial', 'javascript, advanced, webdev', 'developers', 'draft', 1);

-- Prompt log
INSERT INTO prompt_log (content_planning_id, prompt_template, prompt_variables, ai_service, success, response_id)
VALUES 
(1, 'Create a beginner-friendly tutorial script for {{title}} covering {{topics}}', '{"title": "Introduction to Python Programming", "topics": ["variables", "loops", "conditionals"]}', 'openai', TRUE, 'resp_123456');

-- İçerik havuzu
INSERT INTO content_pool (content_planning_id, title, script, status)
VALUES 
(1, 'Introduction to Python Programming - Learn the Basics', 'Hello and welcome to this beginner-friendly tutorial on Python programming...', 'pending_review');

-- Trend log
INSERT INTO trend_log (keyword, category, score, metadata)
VALUES 
('python tutorial', 'programming', 85, '{"monthly_searches": 120000, "competition": "medium"}'),
('javascript tutorial', 'programming', 90, '{"monthly_searches": 150000, "competition": "high"}');

-- Rakip log
INSERT INTO competitor_log (channel_id, competitor_channel_id, competitor_channel_title, metadata)
VALUES 
(1, 'UC0987654321', 'Competitor Channel', '{"subscribers": 100000, "video_count": 200, "avg_views": 15000}');
