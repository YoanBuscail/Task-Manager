# Task-Manager

Task-Manager est une application de gestion de tâches créée avec Laravel. Elle vous permet de créer, modifier et supprimer des tâches. De plus, vous pouvez attribuer des catégories et des tags à vos tâches pour mieux les organiser.

## Fonctionnalités

- **Création de Tâches :** Ajoutez de nouvelles tâches à votre liste avec des détails complets.
- **Modification de Tâches :** Mettez à jour le contenu, la catégorie et les tags de vos tâches existantes.
- **Suppression de Tâches :** Supprimez les tâches que vous avez complétées ou que vous n'avez plus besoin.
- **Catégorisation :** Organisez vos tâches en leur attribuant des catégories spécifiques.
- **Tagging :** Ajoutez des tags à vos tâches pour les regrouper par thème ou par projet.
- **Base de Données :** Utilisation de Laravel pour stocker toutes les données de vos tâches en base de données.

## Captures d'écran

![Capture d'écran 1](https://votre-url-de-capture1.com)
![Capture d'écran 2](https://votre-url-de-capture2.com)

## Installation

Pour exécuter localement l'application Task-Manager, suivez ces étapes :

1. Clonez ce référentiel sur votre machine locale en utilisant la commande suivante :

```
git clone https://github.com/votre-utilisateur/task-manager.git
```

2. Assurez-vous d'avoir installé PHP, Composer et Laravel sur votre machine.

3. Naviguez vers le répertoire du projet Task-Manager et installez les dépendances en exécutant :

```
composer install
```

4. Créez un fichier `.env` en copiant `.env.example` et configurez les paramètres de base de données.

5. Générez une clé d'application en exécutant :

```
php artisan key:generate
```

6. Exécutez les migrations de base de données pour créer les tables nécessaires :

```
php artisan migrate
```

7. Ensuite, démarrez le serveur de développement en utilisant la commande :

```
php artisan serve
```

8. Ouvrez votre navigateur et accédez à l'adresse http://localhost:8000 pour utiliser Task-Manager localement.

## Personnalisation

Vous pouvez personnaliser davantage l'application Task-Manager en modifiant les vues, les contrôleurs et les modèles fournis avec Laravel pour répondre à vos besoins spécifiques.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

N'hésitez pas à utiliser Task-Manager pour gérer vos tâches personnelles ou à le personnaliser pour un usage professionnel. Si vous avez des questions ou des suggestions d'amélioration, n'hésitez pas à les partager. Bonne gestion de vos tâches ! 📋🚀
