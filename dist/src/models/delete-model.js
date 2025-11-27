import { eq } from 'drizzle-orm';
import db from '../db/connection';
import { users } from '../db/data/schema.js';
export const deleteUser = async (user_id) => {
    return await db.delete(users).where(eq(users.user_id, user_id)).returning();
};
//# sourceMappingURL=delete-model.js.map