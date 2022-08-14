import database from "../database";

export const verifyID = async (id: string, db: string) => {
  const verify = await database.query(`SELECT * FROM ${db} WHERE id = $1;`, [
    id,
  ]);

  if (!verify.rows.length) {
    throw new Error("User not found");
  }
  return;
};
interface IUpdateData {
  t1_id: string;
  t2_id: string;
  table: string;
  column: string;
}
export const updateData = async ({
  t1_id,
  t2_id,
  table,
  column,
}: IUpdateData) => {
  try {
    const updated = await database.query(
      `
            UPDATE
                ${table}
            SET
                ${column} = $1
            WHERE
                id = $2 
            RETURNING *;
            `,
      [t2_id, t1_id]
    );

    return updated.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};
