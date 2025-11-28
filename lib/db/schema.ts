import { drizzle } from 'drizzle-orm/d1';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    password: text('password').notNull(),
    role: text('role').default('admin'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
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
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Kuliah Dhuha schedules
export const kuliahDhuhaSchedule = sqliteTable('kuliah_dhuha_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    speaker: text('speaker'),
    materials: text('materials'), // JSON string
    location: text('location').default('Masjid Kampus UPI'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Seminar schedule
export const seminarSchedule = sqliteTable('seminar_schedule', {
    id: text('id').primaryKey(),
    weekNumber: integer('week_number').notNull(),
    date: text('date').notNull(),
    topic: text('topic').notNull(),
    speaker: text('speaker'),
    materials: text('materials'),
    location: text('location'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
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
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
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
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Cabinet members
export const cabinetMembers = sqliteTable('cabinet_members', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    position: text('position').notNull(),
    division: text('division'),
    photoUrl: text('photo_url'),
    email: text('email'),
    phone: text('phone'),
    bio: text('bio'),
    orderIndex: integer('order_index').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type NewCalendarEvent = typeof calendarEvents.$inferInsert;
export type KuliahDhuhaSchedule = typeof kuliahDhuhaSchedule.$inferSelect;
export type News = typeof news.$inferSelect;
export type CabinetMember = typeof cabinetMembers.$inferSelect;
