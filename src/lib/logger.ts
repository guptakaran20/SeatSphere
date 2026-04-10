export const logger = {
  info: (reqId: string, message: string, meta?: any) => {
    console.info(`[INFO] [req:${reqId}] ${message}`, meta ? JSON.stringify(meta) : "");
  },
  error: (reqId: string, message: string, error?: any) => {
    console.error(`[ERROR] [req:${reqId}] ${message}`, error instanceof Error ? error.message : error);
  },
  warn: (reqId: string, message: string, meta?: any) => {
    console.warn(`[WARN] [req:${reqId}] ${message}`, meta ? JSON.stringify(meta) : "");
  }
};
