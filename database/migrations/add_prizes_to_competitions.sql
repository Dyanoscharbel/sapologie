-- Migration pour ajouter les champs de prix à la table competitions
-- Date: 2025-10-17

-- Ajouter les colonnes de prix
ALTER TABLE `competitions` 
ADD COLUMN `prize_first` VARCHAR(255) NULL AFTER `is_active`,
ADD COLUMN `prize_second` VARCHAR(255) NULL AFTER `prize_first`,
ADD COLUMN `prize_third` VARCHAR(255) NULL AFTER `prize_second`;

-- Ajouter la colonne updated_at si elle n'existe pas
ALTER TABLE `competitions` 
ADD COLUMN `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- Renommer la colonne 'name' en 'title' pour la cohérence (optionnel)
-- ALTER TABLE `competitions` CHANGE `name` `title` VARCHAR(200) NOT NULL;
