CREATE TABLE `bag` (
    `bag_id` int(11) NOT NULL,
    `length` int(11) NOT NULL,
    PRIMARY KEY (`bag_id`)
);

CREATE TABLE `users` (
    `user_id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `mail` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `is_admin` tinyint(1) NOT NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `stat` (
    `stat_id` int(11) NOT NULL,
    `strength` int(11) NOT NULL,
    `intelligence` int(11) NOT NULL,
    `speed` int(11) NOT NULL,
    `charisma` int(11) NOT NULL,
    `health` int(11) NOT NULL,
    `luck` int(11) NOT NULL,
    PRIMARY KEY (`stat_id`)
);

CREATE TABLE `loot_table` (
    `loot_id` int(11) NOT NULL,
    `type` enum('helmet','chestplate','gloves','boots','sword','shield','bow','arrow','magic_wand','magic_book','magic_item') NOT NULL,
    `picture` varchar(255) NOT NULL,
    `fight_picture` varchar(255) NULL,
    `name` varchar(255) NOT NULL,
    `description` text NULL,
    `rarity` enum('common','uncommun','rare','epic','legendary') NOT NULL,
    `damage_min` int(11) NULL,
    `damage_max` int(11) NULL,
    `armor_min` int(11) NULL,
    `armor_max` int(11) NULL,
    `strength_min` int(11) NULL,
    `strength_max` int(11) NULL,
    `intelligence_min` int(11) NULL,
    `intelligence_max` int(11) NULL,
    `speed_min` int(11) NULL,
    `speed_max` int(11) NULL,
    `charisma_min` int(11) NULL,
    `charisma_max` int(11) NULL,
    `health_min` int(11) NULL,
    `health_max` int(11) NULL,
    `luck_min` int(11) NULL,
    `luck_max` int(11) NULL,
    `charm` tinyint(1) NOT NULL,
    `charm_type` enum('xp_boost','gold_boost','looting_boost','first_attack_boost') NULL,
    `charm_value` int(11) NULL,
    PRIMARY KEY (`loot_id`)
);

CREATE TABLE `items` (
    `item_id` int(11) NOT NULL,
    `loot_id` int(11) NOT NULL,
    `bag_id` int(11) NULL,
    `level` int(11) NOT NULL,
    `strength` int(11) NULL,
    `intelligence` int(11) NULL,
    `speed` int(11) NULL,
    `charisma` int(11) NULL,
    `health` int(11) NULL,
    `luck` int(11) NULL,
    `charm` tinyint(1) NOT NULL,
    `charm_type` enum('xp_boost','gold_boost','looting_boost','first_attack_boost') NULL,
    `charm_value` int(11) NULL,
    PRIMARY KEY (`item_id`),
    FOREIGN KEY (`loot_id`) REFERENCES `loot_table` (`loot_id`),
    FOREIGN KEY (`bag_id`) REFERENCES `bag` (`bag_id`)
);

CREATE TABLE `equipement` (
    `equipement_id` int(11) NOT NULL,
    `helmet_id` int(11) NULL,
    `chestplate_id` int(11) NULL,
    `gloves_id` int(11) NULL,
    `boots_id` int(11) NULL,
    `primary_weapon_id` int(11) NULL,
    `secondary_weapon_id` int(11) NULL,
    `primary_magic_item_id` int(11) NULL,
    `secondary_magic_item_id` int(11) NULL,
    PRIMARY KEY (`equipement_id`),
    FOREIGN KEY (`helmet_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`chestplate_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`gloves_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`boots_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`primary_weapon_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`secondary_weapon_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`primary_magic_item_id`) REFERENCES `items` (`item_id`),
    FOREIGN KEY (`secondary_magic_item_id`) REFERENCES `items` (`item_id`)
);

CREATE TABLE `caracter` (
    `caracter_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `equipement_id` int(11) NOT NULL,
    `stat_id` int(11) NOT NULL,
    `bag_id` int(11) NOT NULL,
    `picture` text NULL,
    `experience` int(11) NOT NULL,
    `money` int(11) NOT NULL,
    PRIMARY KEY (`caracter_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`equipement_id`),
    FOREIGN KEY (`stat_id`) REFERENCES `stat` (`stat_id`),
    FOREIGN KEY (`bag_id`) REFERENCES `bag` (`bag_id`)
);