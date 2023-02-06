SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `username` VARCHAR(80) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `passwordToken` varchar(200),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
  );

DROP TABLE IF EXISTS `exercices`;
CREATE TABLE IF NOT EXISTS `exercices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(255),
  `video` VARCHAR(255),
  `admin_id` INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_admin_id`
  FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`)
);


DROP TABLE IF EXISTS `workout`;
CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user`
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

DROP TABLE IF EXISTS `exercices_workout`;
CREATE TABLE IF NOT EXISTS `exercices_workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exercice_id` INT NOT NULL,
  `workout_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_exercice`
  FOREIGN KEY (`exercice_id`) REFERENCES `exercices`(`id`),
  CONSTRAINT `fk_workout`
  FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`)
);

DROP TABLE IF EXISTS `Category`;
CREATE TABLE IF NOT EXISTS `Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
  );

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS  `article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `contenent` TEXT NOT NULL,
  `image` VARCHAR(255),
  `video` VARCHAR(255),
  `creation_date` DATETIME NULL DEFAULT NOW(),
  `promote` TINYINT NULL,
  `category_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_article_creator`
  FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`),
  CONSTRAINT `fr_category`
  FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`)
);

DROP TABLE IF EXISTS `favorite_article`;
CREATE TABLE IF NOT EXISTS  `favorite_article`(
 `id` INT NOT NULL AUTO_INCREMENT,
 `user_id` INT NOT NULL,
 `article_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_favorite`
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`),
   CONSTRAINT `fk_article`
  FOREIGN KEY (`article_id`) REFERENCES `article`(`id`)
);
