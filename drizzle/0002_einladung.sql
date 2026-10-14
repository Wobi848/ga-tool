CREATE TABLE `einladung` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`notiz` text,
	`erstellt_von` text NOT NULL,
	`erstellt_am` integer NOT NULL,
	`laeuft_ab` integer NOT NULL,
	`eingeloest_am` integer,
	`eingeloest_von` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `einladung_token_hash_unique` ON `einladung` (`token_hash`);--> statement-breakpoint
CREATE INDEX `einladung_ablauf_idx` ON `einladung` (`laeuft_ab`);