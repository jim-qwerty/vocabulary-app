import { Pool, QueryResult, QueryResultRow, QueryConfig } from "pg";

/** Tipos válidos para parámetros de consultas en pg */
type PgValue =
  | string
  | number
  | boolean
  | null
  | Date
  | Buffer
  | Uint8Array
  | ReadonlyArray<PgValue>
  | Record<string, unknown>;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "1" ? { rejectUnauthorized: false } : undefined,
});

/**
 * Helper tipado para consultar la BD.
 * - Sin `any`
 * - Acepta params readonly y los convierte a array mutable (que exige pg)
 */
export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: ReadonlyArray<PgValue>
): Promise<QueryResult<T>> {
  if (params && params.length) {
    // pg acepta QueryConfig<I>; usamos I = PgValue[]
    const cfg: QueryConfig<PgValue[]> = {
      text,
      values: [...params] as PgValue[], // quita readonly sin usar `any`
    };
    return pool.query<T, PgValue[]>(cfg);
  }
  return pool.query<T>(text);
}

export default pool;
