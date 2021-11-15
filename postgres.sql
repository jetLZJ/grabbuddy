-- Table: gb.user

-- DROP TABLE IF EXISTS gb."user";

CREATE TABLE IF NOT EXISTS gb."user"
(
    uid integer NOT NULL DEFAULT nextval('gb.user_uid_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default",
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    age integer,
    isparent boolean,
    childarray integer[],
    CONSTRAINT user_pkey PRIMARY KEY (uid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS gb."user"
    OWNER to mlmysswstlaavq;