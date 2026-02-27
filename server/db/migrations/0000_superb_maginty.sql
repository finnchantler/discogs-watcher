CREATE TABLE "watchlist" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "watchlist_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"releaseId" text NOT NULL,
	"url" text NOT NULL,
	"alerted" boolean DEFAULT false NOT NULL,
	"added" timestamp NOT NULL
);
