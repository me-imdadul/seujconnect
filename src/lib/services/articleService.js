import {
  getAllArticles,
  addArticle,
  getArticleById,
  updateArticle,
  getArticleByTags,
  deleteArticle,
  getArticleByAuthor,
  getPopularArticle,
  addArticleLikes,
} from "../db/articledb";

export const ArticleService = {
  async findAll() {
    return await getAllArticles();
  },

  async create(data) {
    return await addArticle(data);
  },
  async addLike(id, like) {
    return await addArticleLikes(id, like);
  },

  async findById(id) {
    return await getArticleById(id);
  },
  async findByAuthor(id, type) {
    return await getArticleByAuthor(id, type);
  },
  async findSimilar(tags, id) {
    return await getArticleByTags(tags, id);
  },
  async findPopular() {
    return await getPopularArticle();
  },

  async update(id, data) {
    return await updateArticle(id, data);
  },

  async remove(id) {
    return await deleteArticle(id);
  },
};
