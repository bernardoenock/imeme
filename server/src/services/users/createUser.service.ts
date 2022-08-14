import database from "../../database";
import { hash } from "bcrypt";

const createUserService = async ({ username, email, password }) => {
  try {
    const hashedPassword = await hash(password, 10);
    //TODO: Tratar a date
    // const create_at = new Date();

    let dt = new Date();
    let minutes = `${dt.getMinutes()}`;
    if (dt.getMinutes() < 10) {
      minutes = `0${dt.getMinutes()}`;
    }
    const create_at = `${dt.getHours()}:${minutes} - ${dt.getUTCDate()}/0${
      dt.getUTCMonth() + 1
    }/${dt.getFullYear()}`;

    const res = await database.query(
      `
        INSERT INTO 
        users (username, email, password, create_at) 
        VALUES 
            ($1, $2, $3, $4) 
        RETURNING *;
        `,
      [username, email, hashedPassword, create_at]
    );

    const retUser = {
      message: "Registered Account",
      account: res.rows[0],
    };

    return retUser;
  } catch (error) {
    throw new Error(error);
  }
};

export default createUserService;
