
const { pgTable, integer, varchar, timestamp } = require('drizzle-orm/pg-core');

 const users = pgTable('users', {
  user_id: integer().primaryKey().notNull(),
  username: varchar().notNull(),
  created_on: timestamp().defaultNow().notNull()
});

module.exports = users
