import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../db/articledb";

export const UserService = {
  async findAll() {
    return await getAllUsers();
  },

  async create(data) {
    return await createUser(data);
  },

  async findById(id) {
    return await getUserById(id);
  },

  async update(id, data) {
    return await updateUser(id, data);
  },

  async remove(id) {
    return await deleteUser(id);
  },

  async isExist(email){
    return await isExistsUser(email)

  }
};
