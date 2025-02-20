CREATE TABLE users(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	email VARCHAR(255) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	role VARCHAR(255) CHECK (role IN ('jobseeker', 'employer')) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    salary DECIMAL(10, 2),
	category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    user_id UUID NOT NULL,
    cover_letter TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);