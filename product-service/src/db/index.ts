import { Client } from "pg";
import logger from "utils/logger";

export const db = {
    query: async <T = any>(text: string, params?: T[]) => {
        const client = new Client();
        let result;

        await client.connect();
        try {
            result = await client.query(text, params);
            logger.log(`[db] query: ${text} result count: ${result.rowCount}`);
        } catch (e) {
            logger.error("[db] error:", e.message)
            throw e;
        } finally {
            client.end();
        }
        return result;
    },

    getClient: async () => {
        const client = new Client();
        await client.connect();
        return client;
    }
}
