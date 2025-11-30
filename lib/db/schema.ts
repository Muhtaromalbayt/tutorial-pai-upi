export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type NewCalendarEvent = typeof calendarEvents.$inferInsert;
export type KuliahDhuhaSchedule = typeof kuliahDhuhaSchedule.$inferSelect;
export// Simple Sessions table
    export const simple_sessions = sqliteTable('simple_sessions', {
        id: text('id').primaryKey(),
        userId: text('user_id').notNull(), // Removed references to avoid circular dependency issues
        expiresAt: integer('expires_at').notNull(),
        createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    });
export type BinaMentorSchedule = typeof binaMentorSchedule.$inferSelect;
export type BinderSchedule = typeof binderSchedule.$inferSelect;
export type News = typeof news.$inferSelect;
export type CabinetMember = typeof cabinetMembers.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
