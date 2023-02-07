const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite_article" });
  }

  insertFav(favorite) {
    return this.connection.query(
      `insert into ${this.table} (article_id ,user_id) values (?, ?)`,
      [favorite.article_id, favorite.user_id]
    );
  }

  findFavs(userId) {
    return this.connection.query(
      `SELECT article.id, article.title, article.contenent, article.image, article.video, article.creation_date, article.promote , article.category_id
          FROM article
          JOIN favorite_article ON article.id = favorite_article.article_id
          JOIN user ON favorite_article.User_id = user.id
          WHERE user.id = ${userId}`
    );
  }

  deleteFav(userId, videoId) {
    return this.connection.query(
      "DELETE FROM favorite_article WHERE user_id = ? and article_id = ?",
      [userId, videoId]
    );
  }
}

module.exports = FavoriteManager;
