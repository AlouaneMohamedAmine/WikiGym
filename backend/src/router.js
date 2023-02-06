const express = require("express");

const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: process.env.AVATAR_DIRECTORY });

const { hashPassword, verifyToken } = require("../auth");

// Les Controlleurs :
const userControllers = require("./controllers/userControllers");
const avatarControllers = require("./controllers/avatarControllers");
const categoryControllers = require("./controllers/categoryControllers");
const articleControllers = require("./controllers/articleControllers");
const favoriteControllers = require("./controllers/favoriteControllers");
const workoutControllers = require("./controllers/workoutControllers");

// Gestion des users :
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, verifyToken, userControllers.add);
router.put("/api/users/:id", verifyToken, userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des pdp des users :
router.post(
  "/api/avatars",
  verifyToken,
  upload.single("avatar"),
  avatarControllers.renameAvatar,
  avatarControllers.updateAvatar
);
router.get("/api/avatars/:fileName", avatarControllers.sendAvatar);

// Gestion des catégories :

router.get("/api/category", categoryControllers.browse);
router.get("/api/category/:id", categoryControllers.read);
router.post("/api/category", categoryControllers.add);
router.put("/api/category/:id", categoryControllers.edit);
router.delete("/api/category/:id", categoryControllers.destroy);

// Gestion des articles :

router.post(
  "/api/articles",
  verifyToken,
  upload.fields([{ name: "video" }, { name: "img" }]),
  articleControllers.renameArticle,
  articleControllers.renameImgArticle,
  articleControllers.uploadArticle
);
router.get("/api/articles/promote", articleControllers.promote);
router.post(
  "/api/articles/promote/:id",
  verifyToken,
  articleControllers.editPromote
);

router.get("/api/articles", articleControllers.browse);
router.get("/api/articles/infos/:id", articleControllers.read);
router.get(
  "/api/articles/:fileName",
  articleControllers.sendArticle,
  articleControllers.sendImgArticle
);
router.delete("/api/articles/:id", articleControllers.destroy);

// Gestion des articles favoris :

router.post("/api/favoris", verifyToken, favoriteControllers.addFavorite);
router.get("/api/favoris/:userId", favoriteControllers.getFav);
router.delete(
  "/api/favoris/:userId/:articleId",
  favoriteControllers.deleteFavorite
);

// Gestion des séances d'entraînements :

router.get("/", workoutControllers.browseWorkout);
router.get("/:id", workoutControllers.readWorkout);
router.post("/", workoutControllers.addWorkout);
router.put("/:id", workoutControllers.editWorkout);
router.delete("/:id", workoutControllers.destroyWorkout);

module.exports = router;
