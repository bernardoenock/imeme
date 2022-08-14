import database from "../../database";
import { verifyID, updateData } from "../../utils/functions.utils";

const completeUserService = async ({ user_id, full_name, birthdate, cpf }) => {
  try {
    await verifyID(user_id, "users");

    const res = await database.query(
      `
        INSERT INTO 
          data_persons (full_name, birthdate, cpf) 
        VALUES 
            ($1, $2, $3) 
        RETURNING *;
        `,
      [full_name, birthdate, cpf]
    );
    const data_id = await res.rows[0].id;

    return await updateData({
      t1_id: user_id,
      t2_id: data_id,
      table: "users",
      column: "data_person",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default completeUserService;
