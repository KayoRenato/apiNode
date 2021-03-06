--Utiliza-se um ORM para abstrair esse processo.

DROP TABLE IF EXISTS TB_HEROES;

CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)


--CREATE
INSERT INTO TB_HEROES (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os animais'),
    ('Batman', 'Dinheiro')

--READ
SELECT * FROM TB_HEROES;
SELECT * FROM TB_HEROES WHERE NOME= 'Flash';

--UPDADE
SELECT * FROM TB_HEROES WHERE ID =1;

UPDATE TB_HEROES
SET NOME = 'Goku', Poder= 'Deus'
WHERE ID =1;

SELECT * FROM TB_HEROES WHERE ID =1;

--DELETE
DELETE FROM TB_HEROES WHERE ID=2;