BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE cv';
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END;
/

CREATE TABLE cv(
  cv_link VARCHAR2(255) PRIMARY KEY NOT NULL
)

INSERT INTO cv (cv_link) VALUES ('http://example.com/cv1');
INSERT INTO cv (cv_link) VALUES ('http://example.com/cv2');
INSERT INTO cv (cv_link) VALUES ('http://example.com/cv3');
INSERT INTO cv (cv_link) VALUES ('http://example.com/cv4');
INSERT INTO cv (cv_link) VALUES ('http://example.com/cv5');