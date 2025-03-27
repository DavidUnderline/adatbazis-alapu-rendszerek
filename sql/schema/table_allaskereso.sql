BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE allaskereso';
EXCEPTION
   WHEN OTHERS THEN
      NULL;
END;
/

CREATE TABLE allaskereso (
   email                VARCHAR(255) PRIMARY KEY NOT NULL,
   neve                 VARCHAR(255),
   jelszo               VARCHAR(255),
   utolso_bejelentkezes DATE,
   vegzettseg           VARCHAR(255),
   statusz              boolean,
   cv_id                INT,
   CONSTRAINT foreign_key_cv FOREIGN KEY ( cv_id )
      REFERENCES cv ( cv_link )
);