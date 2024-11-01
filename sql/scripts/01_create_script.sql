BEGIN;

DROP  SCHEMA   IF EXISTS "ShipSchema" CASCADE;

CREATE SCHEMA IF NOT EXISTS "ShipSchema";


ALTER TABLE IF EXISTS "ShipSchema"."TB_SHIPS" DROP CONSTRAINT IF EXISTS "FK_TYP_NAVIRE";

ALTER TABLE IF EXISTS "ShipSchema"."TB_USER_ROLES" DROP CONSTRAINT IF EXISTS "FK_USER";

ALTER TABLE IF EXISTS "ShipSchema"."TB_USER_ROLES" DROP CONSTRAINT IF EXISTS "FK_ROLE";

ALTER TABLE IF EXISTS "ShipSchema"."TB_ROLE_PERMISSION" DROP CONSTRAINT IF EXISTS "FK_ROLE";

ALTER TABLE IF EXISTS "ShipSchema"."TB_ROLE_PERMISSION" DROP CONSTRAINT IF EXISTS "FK_PERM";

ALTER TABLE IF EXISTS "ShipSchema"."TB_ATTENTE_MOTIF" DROP CONSTRAINT IF EXISTS "FK_SHIPS_ID";

ALTER TABLE IF EXISTS "ShipSchema"."TB_ATTENTE_MOTIF" DROP CONSTRAINT IF EXISTS "FK_NAME_ATTENTE";



DROP TABLE IF EXISTS "ShipSchema"."TB_SHIPS";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_SHIPS"
(
    id integer NOT NULL,
    numero integer,
    numer_ordre integer,
    escale integer NOT NULL,
    name_navire character varying(30),
    type_navire integer,
    jauge_brute integer,
    longueur numeric(5, 2),
    largeur numeric(5, 2),
    tpl integer,
    pavillon character varying(30),
    tirant_eau numeric(4, 2),
    consignataire character varying(30),
    provenance character varying(50),
    destination character varying(30),
    entree_port timestamp without time zone,
    entree_mouillage timestamp without time zone,
    sortie_mouillage timestamp without time zone,
    pab_accostage timestamp without time zone,
    accostage timestamp without time zone,
    appareillage_quai timestamp without time zone,
    appareillage_port timestamp without time zone,
    poste character(2),
    motif character(1),
    sejour_rade time without time zone,
    sejour_quai time without time zone,
    sejour_port time without time zone,
    marchandise character varying(30),
    tonnage_import numeric(8, 2),
    tonnage_export numeric(8, 2),
    tonnage_ci numeric(8, 2),
    tonnage_ce numeric(8, 2),
    CONSTRAINT "PK_PRIMARY_ID" PRIMARY KEY (id),
    CONSTRAINT "CT_ESCALE" UNIQUE (escale)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_USER";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_USER"
(
    id serial NOT NULL,
    nom character varying(64),
    prenom character varying(64),
    email character varying(64),
    hashed_password character varying(64),
    username character varying(64),
    CONSTRAINT "PK_ID_USER" PRIMARY KEY (id),
    CONSTRAINT "U_USER_USERNAME" UNIQUE (username)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_ROLES";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_ROLES"
(
    id serial NOT NULL,
    libelle character varying(255) NOT NULL,
    CONSTRAINT "PK_ID_ROLE" PRIMARY KEY (id),
    CONSTRAINT "U_LIBELLE_ROLE" UNIQUE (libelle)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_USER_ROLES";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_USER_ROLES"
(
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT "PK_PRIM_KEY" PRIMARY KEY (user_id, role_id)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_PERMISSION";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_PERMISSION"
(
    id serial NOT NULL,
    libelle character varying(255),
    CONSTRAINT "PK__ID_PERMISSION" PRIMARY KEY (id),
    CONSTRAINT "U_PERM_LIB" UNIQUE (libelle)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_ROLE_PERMISSION";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_ROLE_PERMISSION"
(
    role_id integer NOT NULL,
    permission_id integer NOT NULL,
    CONSTRAINT "PK_ROLE_PERM" PRIMARY KEY (role_id, permission_id)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_ATTENTE_MOTIF";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_ATTENTE_MOTIF"
(
    id serial NOT NULL,
    escale integer NOT NULL,
    poste character(2),
    debut_attente timestamp without time zone,
    fin_attente timestamp without time zone,
    duree_attente time without time zone,
    cause_attente integer,
    CONSTRAINT "PK_ID_ATTENTE_MOTIF" PRIMARY KEY (id)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_NOM_CAUSE";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_NOM_CAUSE"
(
    id serial NOT NULL,
    libelle character varying(30),
    symbol character(1),
    CONSTRAINT "PK_ID_NOM_CAUSE" PRIMARY KEY (id),
    CONSTRAINT "U_NOM_CAUS_LIB" UNIQUE (libelle)
);

DROP TABLE IF EXISTS "ShipSchema"."TB_TYPE_NAVIRE";

CREATE TABLE IF NOT EXISTS "ShipSchema"."TB_TYPE_NAVIRE"
(
    id serial NOT NULL,
    libelle character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT "PK_TYPE_NAVIRE" PRIMARY KEY (id),
    CONSTRAINT "U_LIB_TYP_NAV" UNIQUE (libelle)
);

ALTER TABLE IF EXISTS "ShipSchema"."TB_SHIPS"
    ADD CONSTRAINT "FK_TYP_NAVIRE" FOREIGN KEY (type_navire)
    REFERENCES "ShipSchema"."TB_TYPE_NAVIRE" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_USER_ROLES"
    ADD CONSTRAINT "FK_USER" FOREIGN KEY (user_id)
    REFERENCES "ShipSchema"."TB_USER" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_USER_ROLES"
    ADD CONSTRAINT "FK_ROLE" FOREIGN KEY (role_id)
    REFERENCES "ShipSchema"."TB_ROLES" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_ROLE_PERMISSION"
    ADD CONSTRAINT "FK_ROLE" FOREIGN KEY (role_id)
    REFERENCES "ShipSchema"."TB_ROLES" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_ROLE_PERMISSION"
    ADD CONSTRAINT "FK_PERM" FOREIGN KEY (permission_id)
    REFERENCES "ShipSchema"."TB_PERMISSION" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_ATTENTE_MOTIF"
    ADD CONSTRAINT "FK_SHIPS_ID" FOREIGN KEY (escale)
    REFERENCES "ShipSchema"."TB_SHIPS" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "ShipSchema"."TB_ATTENTE_MOTIF"
    ADD CONSTRAINT "FK_NAME_ATTENTE" FOREIGN KEY (cause_attente)
    REFERENCES "ShipSchema"."TB_NOM_CAUSE" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
