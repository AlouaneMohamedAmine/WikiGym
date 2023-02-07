const models = require("../models");

const addFavorite = (req, res) => {
  const favorite = req.body;

  models.favorite_article
    .insertFav(favorite)
    .then((results) => {
      if (results[0]);

      res
        .location(`/api/favoris/${favorite.user_id}/${favorite.article_id}`)
        .sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const getFav = (req, res) => {
  const { userId } = req.params;
  models.favorite_article
    .findFavs(userId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const deleteFavorite = (req, res) => {
  const { userId, articleId } = req.params;
  models.favorite_article
    .deleteFav(userId, articleId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  addFavorite,
  getFav,
  deleteFavorite,
};
