BEGIN
    EXECUTE IMMEDIATE 'DROP TRIGGER update_ertekeles';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE OR REPLACE TRIGGER update_ertekeles
AFTER INSERT OR UPDATE OR DELETE ON cegertekeles
DECLARE
BEGIN
    -- Frissíti a ceg táblát a beszúrt értékelések átlagával
    UPDATE ceg
    SET ertekeles = (SELECT NVL(AVG(ertekeles), 0) FROM cegertekeles WHERE ceg_adoazonosito = ceg.adoazonosito)
    WHERE adoazonosito IN (SELECT DISTINCT ceg_adoazonosito FROM cegertekeles);
END;
/