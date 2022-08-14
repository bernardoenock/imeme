import database from "../../database";

const listAllUsersService = async () => {
  try {
    const res = await database.query(
      `
        SELECT 
            u.id, 
            u.username, 
            u.email,
            u.data_person, 
            u.create_at, 
            u.update_at 
        FROM 
            users u;
        `
    );

    const retUsers = {
      message: "Registered Accounts",
      accounts: res.rows,
    };

    return retUsers;
  } catch (error) {
    throw new Error(error);
  }
};

export default listAllUsersService;
