const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "travaux"  // 'travaux' est la base de données
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connecté à la base de données MySQL");
    }
});

// Route pour la connexion
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';  // Remplacer 'travaux' par 'users'
    
    const { email, password } = req.body;
    
    // Vérifier si les champs sont remplis
    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // Requête à la base de données
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error("Erreur lors de la requête SQL :", err);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        // Vérifier si des données ont été trouvées
        if (data.length > 0) {
            return res.status(200).json({ message: "Connexion réussie" });
        } else {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }
    });
});


// Route pour l'inscription (register)
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validation des champs
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Vérifier si l'email existe déjà
    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, data) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'email :", err);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        if (data.length > 0) {
            return res.status(409).json({ message: "Email déjà utilisé" });
        }

        // Insertion du nouvel utilisateur
        const insertUserSql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(insertUserSql, [username, email, password], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion de l'utilisateur :", err);
                return res.status(500).json({ message: "Erreur serveur" });
            }

            return res.status(201).json({ message: "Inscription réussie" });
        });
    });
});

// Lancer le serveur
app.listen(8081, () => {
    console.log("Serveur en écoute sur le port 8081");
});
