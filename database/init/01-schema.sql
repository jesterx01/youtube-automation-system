-- YouTube Otomasyon Sistemi - Veritabanı Şeması

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- YouTube kanalları tablosu
CREATE TABLE IF NOT EXISTS channels (
    id SERIAL PRIMARY KEY,
    channel_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(255),
    google_sheets_id VARCHAR(255),
    youtube_api_enabled BOOLEAN DEFAULT FALSE,
    google_sheets_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı-kanal ilişkisi
CREATE TABLE IF NOT EXISTS user_channels (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, channel_id)
);

-- İçerik planlama tablosu
CREATE TABLE IF NOT EXISTS content_planning (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL,
    keywords TEXT,
    target_audience VARCHAR(100),
    planned_publish_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Prompt log tablosu
CREATE TABLE IF NOT EXISTS prompt_log (
    id SERIAL PRIMARY KEY,
    content_planning_id INTEGER REFERENCES content_planning(id) ON DELETE CASCADE,
    prompt_template TEXT NOT NULL,
    prompt_variables JSONB,
    ai_service VARCHAR(50) NOT NULL,
    success BOOLEAN,
    response_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- İçerik havuzu tablosu
CREATE TABLE IF NOT EXISTS content_pool (
    id SERIAL PRIMARY KEY,
    content_planning_id INTEGER REFERENCES content_planning(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    script TEXT,
    thumbnail_url VARCHAR(255),
    video_url VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'pending_review',
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Onaylı içerik havuzu
CREATE TABLE IF NOT EXISTS approved_pool (
    id SERIAL PRIMARY KEY,
    content_pool_id INTEGER REFERENCES content_pool(id) ON DELETE CASCADE,
    approved_by INTEGER REFERENCES users(id),
    publish_date TIMESTAMP WITH TIME ZONE,
    youtube_video_id VARCHAR(50),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reddedilen içerik havuzu
CREATE TABLE IF NOT EXISTS rejected_pool (
    id SERIAL PRIMARY KEY,
    content_pool_id INTEGER REFERENCES content_pool(id) ON DELETE CASCADE,
    rejected_by INTEGER REFERENCES users(id),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- İçerik log tablosu
CREATE TABLE IF NOT EXISTS content_log (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    content_planning_id INTEGER REFERENCES content_planning(id) ON DELETE CASCADE,
    youtube_video_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tags TEXT,
    thumbnail_url VARCHAR(255),
    video_url VARCHAR(255),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performans metrikleri tablosu
CREATE TABLE IF NOT EXISTS performance_metrics (
    id SERIAL PRIMARY KEY,
    content_log_id INTEGER REFERENCES content_log(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    watch_time_minutes INTEGER DEFAULT 0,
    average_view_duration_seconds INTEGER DEFAULT 0,
    average_percentage_viewed NUMERIC(5,2) DEFAULT 0,
    click_through_rate NUMERIC(5,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rakip log tablosu
CREATE TABLE IF NOT EXISTS competitor_log (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    competitor_channel_id VARCHAR(50) NOT NULL,
    competitor_channel_title VARCHAR(100) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- A/B test log tablosu
CREATE TABLE IF NOT EXISTS ab_test_log (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    test_name VARCHAR(100) NOT NULL,
    test_type VARCHAR(50) NOT NULL,
    variant_a JSONB NOT NULL,
    variant_b JSONB NOT NULL,
    winner VARCHAR(1),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trend log tablosu
CREATE TABLE IF NOT EXISTS trend_log (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    score INTEGER,
    metadata JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Çıkarımlar ve strateji tablosu
CREATE TABLE IF NOT EXISTS insight_log (
    id SERIAL PRIMARY KEY,
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    insight_type VARCHAR(50) NOT NULL,
    data JSONB,
    applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Geri bildirim tablosu
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    content_log_id INTEGER REFERENCES content_log(id) ON DELETE CASCADE,
    comment_id VARCHAR(255),
    user_id VARCHAR(255),
    text TEXT,
    sentiment VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- İş kuyruğu log tablosu
CREATE TABLE IF NOT EXISTS job_queue_log (
    id SERIAL PRIMARY KEY,
    job_id VARCHAR(50) NOT NULL,
    queue_name VARCHAR(50) NOT NULL,
    data JSONB,
    status VARCHAR(20) NOT NULL,
    result JSONB,
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_content_planning_channel_id ON content_planning(channel_id);
CREATE INDEX IF NOT EXISTS idx_content_pool_content_planning_id ON content_pool(content_planning_id);
CREATE INDEX IF NOT EXISTS idx_approved_pool_content_pool_id ON approved_pool(content_pool_id);
CREATE INDEX IF NOT EXISTS idx_content_log_channel_id ON content_log(channel_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_content_log_id ON performance_metrics(content_log_id);
CREATE INDEX IF NOT EXISTS idx_insight_log_channel_id ON insight_log(channel_id);
