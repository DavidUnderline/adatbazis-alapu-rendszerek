BEGIN
    -- Akármi más kód itt
    EXECUTE IMMEDIATE 'DROP TRIGGER update_ertekeles';
EXCEPTION
    WHEN OTHERS THEN
        NULL; -- Ha nem létezik a trigger, akkor nem történik semmi
END;
/

CREATE or REPLACE TRIGGER update_ertekeles
AFTER INSERT ON cegertekeles
FOR EACH ROW
BEGIN
    UPDATE ceg
    SET ertekeles = (
        SELECT AVG(ertekeles)
        FROM cegertekeles
        WHERE  ceg_adoazonosito = :NEW.ceg_adoazonosito
    )
    WHERE adoazonosito = :NEW.ceg_adoazonosito;
END;
/
