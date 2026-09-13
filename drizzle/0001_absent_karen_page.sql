CREATE TABLE `anlage` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`objekt_id` text NOT NULL,
	`name` text NOT NULL,
	`art` text DEFAULT 'sonstige' NOT NULL,
	`reihenfolge` integer DEFAULT 0 NOT NULL,
	`erstellt_am` integer NOT NULL,
	`geaendert_am` integer NOT NULL,
	`geloescht_am` integer
);
--> statement-breakpoint
CREATE INDEX `anlage_user_idx` ON `anlage` (`user_id`);--> statement-breakpoint
CREATE INDEX `anlage_objekt_idx` ON `anlage` (`objekt_id`);--> statement-breakpoint
CREATE TABLE `durchlauf` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`objekt_id` text NOT NULL,
	`anlage_id` text,
	`vorlage` text NOT NULL,
	`titel` text NOT NULL,
	`status` text DEFAULT '{}' NOT NULL,
	`notizen` text DEFAULT '{}' NOT NULL,
	`kontext` text DEFAULT '{}' NOT NULL,
	`erledigt` integer DEFAULT 0 NOT NULL,
	`gesamt` integer DEFAULT 0 NOT NULL,
	`erstellt_am` integer NOT NULL,
	`geaendert_am` integer NOT NULL,
	`abgeschlossen_am` integer,
	`geloescht_am` integer
);
--> statement-breakpoint
CREATE INDEX `durchlauf_user_idx` ON `durchlauf` (`user_id`);--> statement-breakpoint
CREATE INDEX `durchlauf_objekt_idx` ON `durchlauf` (`objekt_id`);--> statement-breakpoint
CREATE TABLE `objekt` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`adresse` text DEFAULT '' NOT NULL,
	`auftraggeber` text DEFAULT '' NOT NULL,
	`notiz` text DEFAULT '' NOT NULL,
	`erstellt_am` integer NOT NULL,
	`geaendert_am` integer NOT NULL,
	`archiviert_am` integer,
	`geloescht_am` integer
);
--> statement-breakpoint
CREATE INDEX `objekt_user_idx` ON `objekt` (`user_id`);