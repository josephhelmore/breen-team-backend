declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<Record<string, never>> & {
    $client: import("pg").Pool;
};
export default db;
//# sourceMappingURL=connection.d.ts.map