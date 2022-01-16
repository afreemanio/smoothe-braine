-- CreateTable
CREATE TABLE `Lobby` (
    `lobbyId` VARCHAR(191) NOT NULL,
    `lobbyPublicCode` VARCHAR(6) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires` DATETIME(3) NOT NULL,
    `hostUserId` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `Lobby_lobbyId_key`(`lobbyId`),
    INDEX `Lobby_lobbyId_lobbyPublicCode_idx`(`lobbyId`, `lobbyPublicCode`),
    PRIMARY KEY (`lobbyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lobby` ADD CONSTRAINT `Lobby_hostUserId_fkey` FOREIGN KEY (`hostUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
