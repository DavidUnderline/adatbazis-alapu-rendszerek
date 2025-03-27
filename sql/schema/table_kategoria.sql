BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE kategoria CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE kategoria (
   neve VARCHAR2(255) PRIMARY KEY NOT NULL
)