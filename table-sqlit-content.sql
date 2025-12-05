CREATE TABLE rezept (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titel TEXT NOT NULL,
    beschreibung TEXT,
    portionen INTEGER,
    vorbereitungszeit INTEGER,
    kochzeit INTEGER,
    gesamtzeit INTEGER,
    erstellt DATE,
    aktualisiert DATE,
    vegetarisch INTEGER NOT NULL DEFAULT 0,
    vegan INTEGER NOT NULL DEFAULT 0,
    glutenfrei INTEGER NOT NULL DEFAULT 0,
    anleitung TEXT NOT NULL DEFAULT ''
);

CREATE TABLE zutaten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    menge REAL,
    einheit TEXT,
    menge_pro_person REAL,
    optional INTEGER DEFAULT 0,  
    rezept_id INTEGER
);

INSERT INTO rezept (titel, beschreibung, portionen, vorbereitungszeit, kochzeit, gesamtzeit, vegetarisch, vegan, glutenfrei, anleitung)
VALUES ('Spaghetti Bolognese', 'Leckere klassische Spaghetti mit Fleischsauce', 4, 15, 30, 45, 0, 0, 0, '1. Wasser kochen 2. Nudeln kochen 3. Sauce zubereiten');

INSERT INTO zutaten (name, menge, einheit, menge_pro_person, optional, rezept_id)
VALUES 
('Spaghetti', 400, 'g', 100, 0, 1),
('Hackfleisch', 500, 'g', 125, 0, 1),
('Tomatensauce', 200, 'ml', 50, 0, 1),
('Zwiebel', 1, 'Stück', 0.25, 1, 1),
('Knoblauch', 2, 'Zehen', 0.5, 1, 1);

INSERT INTO rezept (titel, beschreibung, portionen, vorbereitungszeit, kochzeit, gesamtzeit, vegetarisch, vegan, glutenfrei, anleitung)
VALUES (
    'Gemüsepfanne', 
    'Bunte Gemüsepfanne mit Paprika, Zucchini und Karotten', 
    3,      
    10,      
    15,      
    25,      
    1,       
    1,       
    1,       
    '1. Gemüse schneiden 2. Öl erhitzen 3. Gemüse anbraten 4. Würzen nach Geschmack'
);

INSERT INTO zutaten (name, menge, einheit, menge_pro_person, optional, rezept_id) VALUES
('Paprika rot', 300, 'g', 100, 0, 2),
('Zucchini', 300, 'g', 100, 0, 2),
('Karotten', 200, 'g', 66.7, 0, 2),
('Olivenöl', 3, 'EL', 1, 0, 2),
('Salz', 1, 'TL', 0.33, 0, 2),
('Pfeffer', 0.5, 'TL', 0.17, 0, 2),
('Frische Kräuter', 10, 'g', 3.3, 1, 2); 



INSERT INTO rezept (titel, beschreibung, portionen, vorbereitungszeit, kochzeit, gesamtzeit, vegetarisch, vegan, glutenfrei, anleitung)
VALUES (
    'Pfannkuchen',
    'Leckere Pfannkuchen, die man süß oder herzhaft servieren kann',
    4,       
    10,      
    15,      
    25,      
    1,       
    0,       
    0,       
    '1. Teig vorbereiten 2. Pfanne erhitzen 3. Teig portionsweise ausbacken 4. Servieren'
);
INSERT INTO zutaten (name, menge, einheit, menge_pro_person, optional, rezept_id) VALUES
('Mehl', 250, 'g', 62.5, 0, 3),
('Milch', 500, 'ml', 125, 0, 3),
('Eier', 4, 'Stück', 1, 0, 3),
('Salz', 1, 'Prise', 0.25, 0, 3),
('Zucker', 2, 'EL', 0.5, 1, 3), 
('Butter', 20, 'g', 5, 1, 3);   
-- ------------------------------------
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    servings INTEGER,
    prep_time INTEGER,
    cook_time INTEGER,
    total_time INTEGER,
    created DATE,
    updated DATE,
    vegetarian INTEGER NOT NULL DEFAULT 0,
    vegan INTEGER NOT NULL DEFAULT 0,
    gluten_free INTEGER NOT NULL DEFAULT 0,
    instructions TEXT NOT NULL DEFAULT ''
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity REAL,
    unit TEXT,
    quantity_per_person REAL,
    optional INTEGER DEFAULT 0,  
    recipe_id INTEGER
);
INSERT INTO recipes (title, description, servings, prep_time, cook_time, total_time, is_vegetarian, is_vegan, is_gluten_free, instructions)
VALUES ('Spaghetti Bolognese', 'Leckere klassische Spaghetti mit Fleischsauce', 4, 15, 30, 45, 0, 0, 0, '1. Wasser kochen 2. Nudeln kochen 3. Sauce zubereiten');

INSERT INTO ingredients (name, amount, unit, amount_per_person, optional, recipe_id)
VALUES 
('Spaghetti', 400, 'g', 100, 0, 1),
('Hackfleisch', 500, 'g', 125, 0, 1),
('Tomatensauce', 200, 'ml', 50, 0, 1),
('Zwiebel', 1, 'Stück', 0.25, 1, 1),
('Knoblauch', 2, 'Zehen', 0.5, 1, 1);

INSERT INTO recipes (title, description, servings, prep_time, cook_time, total_time, is_vegetarian, is_vegan, is_gluten_free, instructions)
VALUES (
    'Gemüsepfanne', 
    'Bunte Gemüsepfanne mit Paprika, Zucchini und Karotten', 
    3,      
    10,      
    15,      
    25,      
    1,       
    1,       
    1,       
    '1. Gemüse schneiden 2. Öl erhitzen 3. Gemüse anbraten 4. Würzen nach Geschmack'
);

INSERT INTO ingredients (name, amount, unit, amount_per_person, optional, recipe_id) VALUES
('Paprika rot', 300, 'g', 100, 0, 2),
('Zucchini', 300, 'g', 100, 0, 2),
('Karotten', 200, 'g', 66.7, 0, 2),
('Olivenöl', 3, 'EL', 1, 0, 2),
('Salz', 1, 'TL', 0.33, 0, 2),
('Pfeffer', 0.5, 'TL', 0.17, 0, 2),
('Frische Kräuter', 10, 'g', 3.3, 1, 2);

INSERT INTO recipes (title, description, servings, prep_time, cook_time, total_time, is_vegetarian, is_vegan, is_gluten_free, instructions)
VALUES (
    'Pfannkuchen',
    'Leckere Pfannkuchen, die man süß oder herzhaft servieren kann',
    4,       
    10,      
    15,      
    25,      
    1,       
    0,       
    0,       
    '1. Teig vorbereiten 2. Pfanne erhitzen 3. Teig portionsweise ausbacken 4. Servieren'
);

INSERT INTO ingredients (name, amount, unit, amount_per_person, optional, recipe_id) VALUES
('Mehl', 250, 'g', 62.5, 0, 3),
('Milch', 500, 'ml', 125, 0, 3),
('Eier', 4, 'Stück', 1, 0, 3),
('Salz', 1, 'Prise', 0.25, 0, 3),
('Zucker', 2, 'EL', 0.5, 1, 3), 
('Butter', 20, 'g', 5, 1, 3);
-- --------------------------
ALTER TABLE rezept RENAME TO recipe;

