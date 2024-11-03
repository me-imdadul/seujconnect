import { ObjectId } from "mongodb";
import clientPromise, { dbName } from "../config/mongoConfig";

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const users = await db.collection("users").find({}).toArray();
  return users;
}

export async function createUser(data) {
  const { email } = data;
  const client = await clientPromise;
  const db = client.db(dbName);

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return { exists: true };
  }

  const result = await db.collection("users").insertOne(data);
  return { exists: false, user: result.insertedId };
}

export async function getUserById(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  return user;
}

export async function updateUser(id, data) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );
  return result.value;
}

export async function deleteUser(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("users")
    .deleteOne({ _id: new Object(id) });
  return result.deletedCount > 0;
}
