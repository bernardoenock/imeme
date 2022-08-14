import database from "../../database";
import { verifyID } from "../../utils/functions.utils";

const deleteUserService = async ({ id }) => {
  try {
    await verifyID(id, "users");

    await database.query("DELETE FROM users WHERE id = $1", [id]);
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteUserService;
