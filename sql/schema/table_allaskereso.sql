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


INSERT INTO allaskereso (
  email,
  neve,
  jelszo,
  utolso_bejelentkezes,
  vegzettseg,
  statusz,
  cv_id
) 
VALUES 
  ( 'john.doe@example.com', 
    'John Doe', 
    'password123', 
    TO_DATE('2023-01-01', 'YYYY-MM-DD'), 
    'Bachelor', 
    TRUE, 
    1 
  ),
  ( 'jane.smith@example.com', 
    'Jane Smith', 
    'securepass', 
    TO_DATE('2023-02-15', 'YYYY-MM-DD'), 
    'Master', 
    FALSE, 
    2 
  ),
  ( 'alice.wonderland@example.com', 
    'Alice Wonderland', 
    'alice2023', 
    TO_DATE('2023-03-10', 'YYYY-MM-DD'), 
    'PhD', 
    TRUE, 
    3 
  ),
  ( 'bob.builder@example.com', 
    'Bob Builder', 
    'buildit', 
    TO_DATE('2023-04-20', 'YYYY-MM-DD'), 
    'Diploma', 
    FALSE, 
    4 
  ),
  ( 'charlie.brown@example.com', 
    'Charlie Brown', 
    'charlie123', 
    TO_DATE('2023-05-05', 'YYYY-MM-DD'), 
    'High School', 
    TRUE, 
    5 
  );