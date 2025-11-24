import { pgTable, integer, varchar} from "drizzle-orm/pg-core"

 export const  games = pgTable('games', {
  id: integer().primaryKey().notNull(),
  name: varchar().notNull()
});


