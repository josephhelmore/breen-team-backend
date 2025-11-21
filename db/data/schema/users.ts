import { pgTable, varchar, timestamp, serial } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  user_id: serial().primaryKey().notNull(),
  username: varchar().notNull(),
  created_on: timestamp().defaultNow().notNull()
});

module.exports = users;
