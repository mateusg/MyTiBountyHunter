database = Titanium.Database.open("prisoners");
//database.execute("DROP TABLE IF EXISTS prisoners;");
database.execute("CREATE TABLE IF NOT EXISTS prisoners (id INTEGER PRIMARY KEY, name TEXT, age INTEGER DEFAULT 0, captured INTEGER DEFAULT 0);");