const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const VideoArticleDirectory = process.env.AVATAR_DIRECTORY || "public/";
const imgArticleDirectory = process.env.AVATAR_DIRECTORY || "public/";

const browse = (req, res) => {
  models.article
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.params;

  models.article
    .find(id)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    // récupération du nom de fichier de la vidéo et de l'img à supprimer
    const [results] = await models.article.find(id);
    const articleName = results[0].name;
    const imgArticleName = results[0].img;

    // suppression de la vidéo dans la base de données
    const [result] = await models.article.delete(id);
    if (result.affectedRows === 0) res.sendStatus(404);
    else {
      // suppression du fichier vidéo
      fs.unlink(`${VideoArticleDirectory}${articleName}`, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          // suppression du fichier image
          fs.unlink(`${imgArticleDirectory}${imgArticleName}`, (err1) => {
            if (err1) {
              console.error(err1);
              res.sendStatus(500);
            } else {
              res.sendStatus(204);
            }
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const renameArticle = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const originalname = req.files.Article[0].originalname.replace(/\s/g, "-");

  // On récupère le nom du fichier
  const { filename } = req.files.Article[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${VideoArticleDirectory}${filename}`,
    `${VideoArticleDirectory}${uuid}-${originalname}`,
    (err) => {
      console.error("rename: ", err);
      if (err) throw err;
      req.Article = `${uuid}-${originalname}`;
      next();
    }
  );
};
const renameImgArticle = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const { originalname } = req.files.img[0];

  // On récupère le nom du fichier
  const { filename } = req.files.img[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${imgArticleDirectory}${filename}`,
    `${imgArticleDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.img = `${uuid}-${originalname}`;
      next();
    }
  );
};

const uploadArticle = (req, res) => {
  const articleName = req.article;
  const article = req.body;
  const imgArticleName = req.img;

  models.article
    .insert(article, articleName, imgArticleName)
    .then(([result]) => {
      res.status(201).location(`/api/article/${result.insertId}`).send();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const sendArticle = (req, res) => {
  const { fileName } = req.params;

  res.download(VideoArticleDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
    }
  });
};

const promote = (req, res) => {
  models.article
    .promotedArticle()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const editPromote = (req, res) => {
  const article = req.body;
  article.id = parseInt(req.params.id, 10);

  models.article
    .updatePromote(article)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const sendImgArticle = (req, res) => {
  const { fileName } = req.params;

  res.download(imgArticleDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
    }
  });
};

module.exports = {
  renameArticle,
  sendArticle,
  uploadArticle,
  browse,
  read,
  renameImgArticle,
  sendImgArticle,
  destroy,
  promote,
  editPromote,
};
