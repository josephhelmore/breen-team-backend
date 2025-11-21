const { pgTable, integer, varchar} = require("drizzle-orm/pg-core")

 const games = pgTable('games', {
  id: integer().primaryKey().notNull(),
  name: varchar().notNull()
});

module.exports = games