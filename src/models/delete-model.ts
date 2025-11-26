import { eq } from 'drizzle-orm'
import db from '../db/connection'
import { users } from '../db/data/schema/users'

export const deleteUser = async (user_id: number) => {
    return await db.delete(users).where(eq(users.user_id, user_id)).returning()
}
