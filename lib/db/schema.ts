import { drizzle } from 'drizzle-orm/d1';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table with password for Simple Auth
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').default('user'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Simple Sessions table
export const simple_sessions = sqliteTable('simple_sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(), // Removed references to avoid circular dependency issues
    expiresAt: integer('expires_at').notNull(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Calendar events
export const calendarEvents = sqliteTable('calendar_events', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category').notNull(),
    date: text('date').notNull(),
    time: text('time'),
    location: text('location'),
    imageUrl: text('image_url'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Kuliah Dhuha schedules
export const kuliahDhuhaSchedule = sqliteTable('kuliah_dhuha_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    dayType: text('day_type').default('Sabtu'), // 'Sabtu' or 'Minggu'
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    speaker: text('speaker'),
    materials: text('materials'), // JSON string
    location: text('location').default('Masjid Kampus UPI'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Seminar schedule
export const seminarSchedule = sqliteTable('seminar_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    dayType: text('day_type').default('Rabu'), // 'Rabu' or 'Jumat'
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    facilitator: text('facilitator'), // Dosen Fasilitator
    presenter1: text('presenter1'), // Penyaji Mahasiswa 1
    presenter2: text('presenter2'), // Penyaji Mahasiswa 2
    presenter3: text('presenter3'), // Penyaji Mahasiswa 3
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Mentoring schedule
export const mentoringSchedule = sqliteTable('mentoring_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    mentor: text('mentor'),
    groupNumber: integer('group_number'),
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Bina Kader schedule
export const binaKaderSchedule = sqliteTable('bina_kader_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    facilitator: text('facilitator'),
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Bina Mentor schedule
export const binaMentorSchedule = sqliteTable('bina_mentor_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    facilitator: text('facilitator'),
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Binder schedule
export const binderSchedule = sqliteTable('binder_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    facilitator: text('facilitator'),
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Feedback
export const feedback = sqliteTable('feedback', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    isAnonymous: integer('is_anonymous', { mode: 'boolean' }).default(false),
    category: text('category').notNull(),
    subject: text('subject').notNull(),
    message: text('message').notNull(),
    attachments: text('attachments'), // JSON string
    status: text('status').default('pending'),
    adminNotes: text('admin_notes'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// News
export const news = sqliteTable('news', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    category: text('category').default('announcement'),
    imageUrl: text('image_url'),
    author: text('author'),
    publishedDate: text('published_date'),
    isPublished: integer('is_published', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Cabinet members
export const cabinetMembers = sqliteTable('cabinet_members', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    position: text('position').notNull(),
    division: text('division'),
    programStudi: text('program_studi'), // Program studi/angkatan (e.g., "Pendidikan Matematika 2023")
    photoUrl: text('photo_url'),
    email: text('email'),
    phone: text('phone'),
    bio: text('bio'),
    orderIndex: integer('order_index').default(0),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Site Settings
export const siteSettings = sqliteTable('site_settings', {
    key: text('key').primaryKey(),
    value: text('value'),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Gallery / Photos
export const gallery = sqliteTable('gallery', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    imageUrl: text('image_url').notNull(), // Google Drive URL
    category: text('category').default('Kegiatan'),
    placeholder: text('placeholder'), // Which location this photo should appear (e.g., hero_home, hero_struktur)
    orderIndex: integer('order_index').default(0),
    isPublished: integer('is_published', { mode: 'boolean' }).default(true),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Knowledge Chunks for RAG (Minral AI)
export const knowledgeChunks = sqliteTable('knowledge_chunks', {
    id: text('id').primaryKey(),
    sourceFile: text('source_file').notNull(), // Original PDF filename
    chunkIndex: integer('chunk_index').notNull(), // Order within the document
    content: text('content').notNull(), // The actual text content
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SimpleSession = typeof simple_sessions.$inferSelect;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type NewCalendarEvent = typeof calendarEvents.$inferInsert;
export type KuliahDhuhaSchedule = typeof kuliahDhuhaSchedule.$inferSelect;
export type SeminarSchedule = typeof seminarSchedule.$inferSelect;
export type MentoringSchedule = typeof mentoringSchedule.$inferSelect;
export type BinaKaderSchedule = typeof binaKaderSchedule.$inferSelect;
export type BinaMentorSchedule = typeof binaMentorSchedule.$inferSelect;
export type BinderSchedule = typeof binderSchedule.$inferSelect;
export type News = typeof news.$inferSelect;
export type CabinetMember = typeof cabinetMembers.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type Gallery = typeof gallery.$inferSelect;
export type NewGallery = typeof gallery.$inferInsert;
export type KnowledgeChunk = typeof knowledgeChunks.$inferSelect;

