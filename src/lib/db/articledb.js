import { ObjectId } from "mongodb";
import clientPromise, { dbName } from "../config/mongoConfig";

export async function getAllArticles() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const articles = await db.collection("articles").find({}).toArray();
  return articles;
}

export async function addArticle(data) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db.collection("articles").insertOne(data);
  return { id: result.insertedId, ...data };
}

export async function getArticleById(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .findOne({ _id: new ObjectId(id) });
  return article;
}
export async function getPopularArticle() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .find({})
    .sort({ likes: -1 })
    .limit(10);
  return article;
}

export async function getArticleByAuthor(authorId, status) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .find({ user: authorId, status: status })
    .toArray();
  return article;
}

export async function getArticleByTags(tags, id) {
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .find({ tags: { $in: tagsArray }, _id: { $nin: [new ObjectId(id)] } })
    .toArray();
  return article;
}

//views
export async function getArticleTotalViews(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .find({ tags: { $in: tagsArray }, _id: { $nin: [new ObjectId(id)] } })
    .toArray();
  return article;
}

export async function addArticleViews(id, view) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("articles")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { views: view } },
      { returnDocument: "after" }
    );
  return { id: result.insertedId };
}

//comments
export async function getArticleComments(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .findOne({ _id: id })
    .toArray();
  return article;
}

export async function addArticleComments(id, data) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("articles")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { comments: data } },
      { returnDocument: "after" }
    );
  return { id: result.insertedId };
}

//likes
export async function getArticleLikes(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .findOne({ _id: id })
    .toArray();
  return article;
}

export async function addArticleLikes(id, likes) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("articles")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { likes: likes } },
      { returnDocument: "after" }
    );
  return { id: result.insertedId };
}

export async function deleteArticleViews(tags, id) {
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  const client = await clientPromise;
  const db = client.db(dbName);
  const article = await db
    .collection("articles")
    .find({ tags: { $in: tagsArray }, _id: { $nin: [new ObjectId(id)] } })
    .toArray();
  return article;
}

export async function updateArticle(id, data) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("articles")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );
  return result;
}

//delete
export async function deleteArticle(id) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const result = await db
    .collection("articles")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
