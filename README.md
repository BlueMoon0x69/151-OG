# 🚀 Guide Installation - Collection Pokémon avec Google Sheets

## 📋 Vue d'ensemble

Votre collection sera gérée via **Google Sheets** (comme Excel en ligne) et affichée sur votre site.

**Avantages :**
- ✅ Ajout de cartes en 10 secondes
- ✅ Modification facile (prix, rareté, etc.)
- ✅ Accessible partout (mobile, tablette, PC)
- ✅ 100% gratuit
- ✅ Pas de code à toucher

---

## 🎯 Installation (15 minutes)

### **ÉTAPE 1 : Créer votre Google Sheet** (5 min)

1. **Allez sur** [Google Sheets](https://sheets.google.com)
2. **Créez** une nouvelle feuille de calcul
3. **Nommez-la** "Collection Pokémon"
4. **Créez les colonnes** (ligne 1) :
   ```
   A: Nom
   B: Numéro
   C: Série
   D: Prix
   E: Rareté
   F: URL Cardmarket
   G: URL Image
   ```

5. **Importez vos données** :
   - Téléchargez le fichier `collection_pokemon.csv`
   - Dans Google Sheets : Fichier → Importer → Upload
   - Sélectionnez le CSV
   - ✅ Vos 51 cartes sont maintenant dans le Sheet !

---

### **ÉTAPE 2 : Rendre le Google Sheet public** (2 min)

1. **Cliquez** sur "Partager" (en haut à droite)
2. **Changez** "Accès restreint" → "Tous les utilisateurs disposant du lien"
3. **Assurez-vous** que c'est en mode "Lecteur" (pas "Éditeur")
4. **Copiez** le lien du Google Sheet

**⚠️ Important :** Le Google Sheet doit être public en LECTURE SEULE.

---

### **ÉTAPE 3 : Activer l'API Google Sheets** (5 min)

1. **Allez sur** [Google Cloud Console](https://console.cloud.google.com)
2. **Créez** un nouveau projet :
   - Nom : "Collection Pokemon"
   - Cliquez "Créer"
3. **Activez l'API** :
   - Menu → "API et services" → "Bibliothèque"
   - Recherchez "Google Sheets API"
   - Cliquez "Activer"
4. **Créez une clé API** :
   - Menu → "API et services" → "Identifiants"
   - "Créer des identifiants" → "Clé API"
   - **Copiez** la clé API générée (elle ressemble à : `AIzaSyD...`)

5. **Restreignez la clé** (sécurité) :
   - Cliquez sur la clé créée
   - "Restrictions liées à l'API" → Sélectionnez "Google Sheets API"
   - Sauvegardez

---

### **ÉTAPE 4 : Configurer le site** (3 min)

1. **Ouvrez** le fichier `index_googlesheets.html`
2. **Trouvez ces lignes** (vers le haut du fichier) :
   ```javascript
   const SHEET_ID = 'VOTRE_SHEET_ID';
   const API_KEY = 'VOTRE_API_KEY';
   ```

3. **Remplacez** `VOTRE_SHEET_ID` par l'ID de votre Google Sheet
   - L'ID se trouve dans l'URL de votre Google Sheet :
   - `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Exemple : `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

4. **Remplacez** `VOTRE_API_KEY` par votre clé API
   - Exemple : `AIzaSyD9wXw...`

5. **Sauvegardez** le fichier

---

### **ÉTAPE 5 : Déployer sur Netlify** (2 min)

1. **Renommez** `index_googlesheets.html` → `index.html`
2. **Uploadez** sur Netlify avec :
   - `index.html`
   - Dossier `css/` (avec `styles.css`)
   - Dossier `js/` (avec `app.js`)
3. **Publiez** !

---

## 🎮 Utilisation quotidienne

### **Pour ajouter une carte :**

1. **Ouvrez** votre Google Sheet
2. **Ajoutez une ligne** :
   ```
   Pikachu ex | 025/165 | 151 | 30 | Ultra Rare | https://... | https://...
   ```
3. **Actualisez** votre site (ou attendez 5 min, c'est automatique)
4. **C'est tout !** La carte apparaît ! 🎉

### **Pour modifier une carte :**

1. **Ouvrez** votre Google Sheet
2. **Modifiez** le prix, la rareté, etc.
3. **Actualisez** le site
4. **C'est fait !**

### **Pour supprimer une carte :**

1. **Ouvrez** votre Google Sheet
2. **Supprimez** la ligne
3. **Actualisez** le site
4. **Terminé !**

---

## 📱 Application mobile

**Sur téléphone :**
1. Téléchargez l'app **Google Sheets**
2. Ouvrez votre collection
3. Ajoutez/modifiez des cartes depuis votre mobile !

---

## 🔄 Synchronisation automatique

Le site se synchronise **automatiquement** toutes les 5 minutes.

Vous pouvez aussi cliquer sur le bouton **🔄 Actualiser** pour forcer la synchro.

---

## 🆘 Dépannage

### **Erreur "Impossible de charger"**

✅ **Vérifiez** :
1. Le Google Sheet est-il public ?
2. L'API Google Sheets est-elle activée ?
3. La clé API est-elle correcte ?
4. Le SHEET_ID est-il correct ?

### **Les modifications n'apparaissent pas**

✅ **Solution** :
- Cliquez sur "🔄 Actualiser"
- Videz le cache du navigateur (Ctrl+F5)

### **Une carte ne s'affiche pas**

✅ **Vérifiez** :
- L'URL de l'image est-elle correcte ?
- La ligne du Google Sheet est-elle complète ?

---

## 💡 Astuces

### **Auto-complétion dans Google Sheets**

Créez des formules pour auto-générer les URLs d'images :

```
=CONCATENATE("https://pokecardex.b-cdn.net/assets/images/sets/MEW/HD/", TEXT(A2,"000"), ".jpg")
```

### **Calcul de la valeur totale**

Ajoutez une formule en bas de la colonne Prix :
```
=SOMME(D2:D100)
```

### **Filtre par série**

Utilisez les filtres Google Sheets pour voir uniquement une série.

---

## 📊 Structure du Google Sheet

```
┌─────────────────┬──────────┬────────────┬────────┬──────────────┬─────────────────┬──────────────────┐
│ Nom             │ Numéro   │ Série      │ Prix   │ Rareté       │ URL Cardmarket  │ URL Image        │
├─────────────────┼──────────┼────────────┼────────┼──────────────┼─────────────────┼──────────────────┤
│ Pikachu ex      │ 025/165  │ 151        │ 30     │ Ultra Rare   │ https://...     │ https://...      │
│ Dracaufeu ex    │ 006/165  │ 151        │ 150    │ Ultra Rare   │ https://...     │ https://...      │
└─────────────────┴──────────┴────────────┴────────┴──────────────┴─────────────────┴──────────────────┘
```

---

## 🎉 C'est tout !

Vous avez maintenant une collection professionnelle gérée via Google Sheets !

**Ajoutez des cartes en quelques secondes, depuis n'importe où ! 🎴✨**

---

## 📞 Support

Des questions ? Contactez-moi et je vous aide ! 😊
