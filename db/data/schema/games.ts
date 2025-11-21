import { pgTable, integer, varchar} from "drizzle-orm/pg-core"

 const games = pgTable('games', {
  id: integer().primaryKey().notNull(),
  name: varchar().notNull()
});

module.exports = games