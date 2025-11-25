import { sql } from 'drizzle-orm'
import db from '../db/connection'
import { users } from '../db/data/schema/users'

export const readUsers = async () => {
    return await db.select().from(users)
}

export const readUser = async (user_id: string) => {
    return await db.select().from(users).where(sql`${users.user_id} = ${user_id}`)
}