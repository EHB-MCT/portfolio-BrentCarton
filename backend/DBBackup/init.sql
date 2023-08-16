--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-06 17:08:48 PKT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16390)
-- Name: examen_db; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA examen_db;


ALTER SCHEMA examen_db OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16444)
-- Name: room1; Type: TABLE; Schema: examen_db; Owner: postgres
--

CREATE TABLE examen_db.room1 (
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    entry_timestamp timestamp with time zone NOT NULL,
    exit_timestamp timestamp with time zone,
    duration integer,
    is_active boolean DEFAULT true
);


ALTER TABLE examen_db.room1 OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16442)
-- Name: room1_room_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room1_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room1_room_id_seq OWNER TO postgres;

--
-- TOC entry 3661 (class 0 OID 0)
-- Dependencies: 217
-- Name: room1_room_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room1_room_id_seq OWNED BY examen_db.room1.room_id;


--
-- TOC entry 218 (class 1259 OID 16443)
-- Name: room1_user_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room1_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room1_user_id_seq OWNER TO postgres;

--
-- TOC entry 3662 (class 0 OID 0)
-- Dependencies: 218
-- Name: room1_user_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room1_user_id_seq OWNED BY examen_db.room1.user_id;


--
-- TOC entry 222 (class 1259 OID 16467)
-- Name: room2; Type: TABLE; Schema: examen_db; Owner: postgres
--

CREATE TABLE examen_db.room2 (
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    entry_timestamp timestamp with time zone NOT NULL,
    exit_timestamp timestamp with time zone,
    duration integer,
    is_active boolean DEFAULT true
);


ALTER TABLE examen_db.room2 OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16465)
-- Name: room2_room_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room2_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room2_room_id_seq OWNER TO postgres;

--
-- TOC entry 3663 (class 0 OID 0)
-- Dependencies: 220
-- Name: room2_room_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room2_room_id_seq OWNED BY examen_db.room2.room_id;


--
-- TOC entry 221 (class 1259 OID 16466)
-- Name: room2_user_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room2_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room2_user_id_seq OWNER TO postgres;

--
-- TOC entry 3664 (class 0 OID 0)
-- Dependencies: 221
-- Name: room2_user_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room2_user_id_seq OWNED BY examen_db.room2.user_id;


--
-- TOC entry 225 (class 1259 OID 16482)
-- Name: room3; Type: TABLE; Schema: examen_db; Owner: postgres
--

CREATE TABLE examen_db.room3 (
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    entry_timestamp timestamp with time zone NOT NULL,
    exit_timestamp timestamp with time zone,
    duration integer,
    is_active boolean DEFAULT true
);


ALTER TABLE examen_db.room3 OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16480)
-- Name: room3_room_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room3_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room3_room_id_seq OWNER TO postgres;

--
-- TOC entry 3665 (class 0 OID 0)
-- Dependencies: 223
-- Name: room3_room_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room3_room_id_seq OWNED BY examen_db.room3.room_id;


--
-- TOC entry 224 (class 1259 OID 16481)
-- Name: room3_user_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.room3_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.room3_user_id_seq OWNER TO postgres;

--
-- TOC entry 3666 (class 0 OID 0)
-- Dependencies: 224
-- Name: room3_user_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.room3_user_id_seq OWNED BY examen_db.room3.user_id;


--
-- TOC entry 216 (class 1259 OID 16392)
-- Name: users; Type: TABLE; Schema: examen_db; Owner: postgres
--

CREATE TABLE examen_db.users (
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE examen_db.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16391)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: examen_db; Owner: postgres
--

CREATE SEQUENCE examen_db.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE examen_db.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3667 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: examen_db; Owner: postgres
--

ALTER SEQUENCE examen_db.users_user_id_seq OWNED BY examen_db.users.user_id;


--
-- TOC entry 3481 (class 2604 OID 16447)
-- Name: room1 room_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room1 ALTER COLUMN room_id SET DEFAULT nextval('examen_db.room1_room_id_seq'::regclass);


--
-- TOC entry 3482 (class 2604 OID 16448)
-- Name: room1 user_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room1 ALTER COLUMN user_id SET DEFAULT nextval('examen_db.room1_user_id_seq'::regclass);


--
-- TOC entry 3484 (class 2604 OID 16470)
-- Name: room2 room_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room2 ALTER COLUMN room_id SET DEFAULT nextval('examen_db.room2_room_id_seq'::regclass);


--
-- TOC entry 3485 (class 2604 OID 16471)
-- Name: room2 user_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room2 ALTER COLUMN user_id SET DEFAULT nextval('examen_db.room2_user_id_seq'::regclass);


--
-- TOC entry 3487 (class 2604 OID 16485)
-- Name: room3 room_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room3 ALTER COLUMN room_id SET DEFAULT nextval('examen_db.room3_room_id_seq'::regclass);


--
-- TOC entry 3488 (class 2604 OID 16486)
-- Name: room3 user_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room3 ALTER COLUMN user_id SET DEFAULT nextval('examen_db.room3_user_id_seq'::regclass);


--
-- TOC entry 3480 (class 2604 OID 16395)
-- Name: users user_id; Type: DEFAULT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.users ALTER COLUMN user_id SET DEFAULT nextval('examen_db.users_user_id_seq'::regclass);


--
-- TOC entry 3649 (class 0 OID 16444)
-- Dependencies: 219
-- Data for Name: room1; Type: TABLE DATA; Schema: examen_db; Owner: postgres
--



--
-- TOC entry 3652 (class 0 OID 16467)
-- Dependencies: 222
-- Data for Name: room2; Type: TABLE DATA; Schema: examen_db; Owner: postgres
--



--
-- TOC entry 3655 (class 0 OID 16482)
-- Dependencies: 225
-- Data for Name: room3; Type: TABLE DATA; Schema: examen_db; Owner: postgres
--



--
-- TOC entry 3646 (class 0 OID 16392)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: examen_db; Owner: postgres
--



--
-- TOC entry 3668 (class 0 OID 0)
-- Dependencies: 217
-- Name: room1_room_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room1_room_id_seq', 1, true);


--
-- TOC entry 3669 (class 0 OID 0)
-- Dependencies: 218
-- Name: room1_user_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room1_user_id_seq', 1, false);


--
-- TOC entry 3670 (class 0 OID 0)
-- Dependencies: 220
-- Name: room2_room_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room2_room_id_seq', 1, true);


--
-- TOC entry 3671 (class 0 OID 0)
-- Dependencies: 221
-- Name: room2_user_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room2_user_id_seq', 1, false);


--
-- TOC entry 3672 (class 0 OID 0)
-- Dependencies: 223
-- Name: room3_room_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room3_room_id_seq', 1, true);


--
-- TOC entry 3673 (class 0 OID 0)
-- Dependencies: 224
-- Name: room3_user_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.room3_user_id_seq', 1, false);


--
-- TOC entry 3674 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: examen_db; Owner: postgres
--

SELECT pg_catalog.setval('examen_db.users_user_id_seq', 2, true);


--
-- TOC entry 3495 (class 2606 OID 16451)
-- Name: room1 room1_pk; Type: CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room1
    ADD CONSTRAINT room1_pk PRIMARY KEY (room_id);


--
-- TOC entry 3497 (class 2606 OID 16474)
-- Name: room2 room2_pk; Type: CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room2
    ADD CONSTRAINT room2_pk PRIMARY KEY (room_id);


--
-- TOC entry 3499 (class 2606 OID 16489)
-- Name: room3 room3_pk; Type: CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room3
    ADD CONSTRAINT room3_pk PRIMARY KEY (room_id);


--
-- TOC entry 3491 (class 2606 OID 16399)
-- Name: users users_pk; Type: CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- TOC entry 3493 (class 2606 OID 16434)
-- Name: users users_un; Type: CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.users
    ADD CONSTRAINT users_un UNIQUE (email);


--
-- TOC entry 3500 (class 2606 OID 16452)
-- Name: room1 room1_fk; Type: FK CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room1
    ADD CONSTRAINT room1_fk FOREIGN KEY (user_id) REFERENCES examen_db.users(user_id);


--
-- TOC entry 3501 (class 2606 OID 16475)
-- Name: room2 room2_fk; Type: FK CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room2
    ADD CONSTRAINT room2_fk FOREIGN KEY (user_id) REFERENCES examen_db.users(user_id);


--
-- TOC entry 3502 (class 2606 OID 16490)
-- Name: room3 room3_fk; Type: FK CONSTRAINT; Schema: examen_db; Owner: postgres
--

ALTER TABLE ONLY examen_db.room3
    ADD CONSTRAINT room3_fk FOREIGN KEY (user_id) REFERENCES examen_db.users(user_id);


-- Completed on 2023-08-06 17:08:48 PKT

--
-- PostgreSQL database dump complete
--

