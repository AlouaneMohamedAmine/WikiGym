const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(article, videoArticle, imgArticle) {
    return this.connection.query(
      `insert into ${this.table} (title, contenent, image, video, promote, category_id, admin_id) values (?, ?, ?, ?,?, ?, ?)`,
      [
        videoArticle,
        article.title,
        article.contenent,
        imgArticle,
        article.promote,
        article.category_id,
        article.admin_id,
      ]
    );
  }

  promotedVideo() {
    return this.connection.query(
      `select * from  ${this.table} where promote=1 ORDER BY creation_date DESC LIMIT 10`
    );
  }

  updatePromote(article) {
    return this.connection.query(
      `update ${this.table} set promote= ? where id = ?`,
      [article.promote, article.id]
    );
  }
}

module.exports = ArticleManager;
