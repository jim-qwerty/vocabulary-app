CREATE INDEX IF NOT EXISTS ix_palabra_categoria ON palabra(categoria_id);
CREATE INDEX IF NOT EXISTS ix_categoria_nombre ON categoria(LOWER(nombre));
CREATE UNIQUE INDEX IF NOT EXISTS ux_palabra_cat_es
  ON palabra (categoria_id, palabra_espanol);
