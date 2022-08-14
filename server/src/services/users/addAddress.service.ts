import database from "../../database";
import { verifyID, updateData } from "../../utils/functions.utils";

const addAddressService = async ({
  user_id,
  postal_code,
  street,
  district,
  city,
  state,
  country,
}) => {
  try {
    await verifyID(user_id, "users");

    const getData_id = await database.query(
      `
        SELECT 
            u.data_person 
        FROM users u 
            WHERE id = $1;
    `,
      [user_id]
    );

    const data_id = await getData_id.rows[0].id;

    const address = await database.query(
      `
      INSERT INTO 
      addresses (postal_code, street, district, city, state, country) 
      VALUES 
          ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `,
      [postal_code, street, district, city, state, country]
    );

    const address_id = await address.rows[0].id;

    return await updateData({
      t1_id: data_id,
      t2_id: address_id,
      table: "data_persons",
      column: "address_id",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default addAddressService;
