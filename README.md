# 🎓 Inskripta – Plateforme de gestion d'inscriptions en ligne

Inskripta est une solution **SaaS** moderne, pensée pour les associations, clubs, écoles ou tout organisme souhaitant
gérer les inscriptions, paiements, et utilisateurs via une interface intuitive et multi-tenant.  
Elle repose sur **Next.js** et **Supabase**, avec un système d'authentification et une architecture modulaire.

---

## 🚀 Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :

[![NodeJS](https://img.shields.io/badge/Node.js-22.x_required-brightgreen?logo=node.js)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-11.x_required-CB3837?logo=npm)](https://www.npmjs.com/)
[![Docker](https://img.shields.io/badge/Docker-required-2496ED?logo=docker)](https://www.docker.com/)

> 💡 Docker n’est requis **que** si vous utilisez Supabase en local (voir section configuration).

---

## 🛠️ Installation

Clonez le dépôt Git et installez les dépendances :

```bash
git clone https://github.com/Aredli16/inskripta.git
cd inskripta
npm install
```

---

## ⚙️ Configuration

### 1. 📦 Lancer Supabase en local

Lancez Supabase avec Docker (via l’outil CLI Supabase) :

```bash
npx supabase start
```

> Cette commande va démarrer une instance locale de Supabase. La sortie affichera l’URL et les clés d’API nécessaires.

> ⚠️ Sur **Windows**, il est possible que cette commande génère une erreur liée à Vector.
> Dans ce cas, lancez plutôt la commande suivante :
>
> ```bash
> npx supabase start -x vector
> ```

> 💡 Sur **Linux**, vous pouvez lancer directement la commande personnalisée pour démarrer Supabase et générer
> automatiquement le fichier `.env.local` avec les bonnes variables :
>
> ```bash
> npm run supabase:start
> ```
>
> Vous pouvez alors skip la création manuelle du fichier `.env` décrite ci-dessous, car `.env.local` sera prêt à
> l’emploi.
>
> ⚠️ Si vous êtes sous **WSL (Windows Subsystem for Linux)**, vous pouvez tenter cette commande, mais l’erreur liée à
> Vector peut persister. Dans ce cas, utilisez la commande Windows `npx supabase start -x vector` depuis un terminal
> Windows classique.

---

### 2. 📡 Alternative : utiliser Supabase distant

Vous pouvez également connecter l'application à une instance **Supabase hébergée à distance** (
via [supabase.com](https://supabase.com)) :

- Dans ce cas, **Docker n’est pas requis**.
- Récupérez les **URL** et **clés API** de votre projet dans l’interface web Supabase.
- Ajoutez-les à votre fichier `.env` local.

Ensuite, n’oubliez pas de pousser les migrations vers Supabase distant :

```bash
npx supabase db push
```

> ⚠️ **Ne partagez jamais** votre clé `service_role` publiquement. Elle doit être utilisée **uniquement côté serveur** (
> dans des API, server actions, edge functions, etc.).

### 3. 🔐 Créer un fichier `.env`

Si vous n’avez pas utilisé la commande `npm run supabase:start` sous Linux, créez un fichier .env à la racine du
projet :

```env
NEXT_PUBLIC_SUPABASE_URL=              # URL de votre instance Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=         # Clé API anonyme (anon key)
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY= # Clé de rôle de service (service_role key)
```

---

## 🧑‍💻 Lancement de l'application

### 🔧 Mode développement

```bash
npm run dev
```

Accès local : [http://localhost:3000](http://localhost:3000)

### 🏁 Mode production

```bash
npm run build
npm run start
```

---

## 🧪 Comptes de test

Des comptes de démonstration sont disponibles :

| 🎭 Rôle                 | 📧 Email                    | 🔑 Mot de passe |
| ----------------------- | --------------------------- | --------------- |
| 🛡️ Super administrateur | `superadmin@inskripta.com`  | `azerty`        |
| 🏢 Admin orga “test”    | `test.admin@inskripta.com`  | `azerty`        |
| 🏢 Admin orga “test2”   | `test2.admin@inskripta.com` | `azerty`        |

---

## 🌐 URLs de test

- `http://localhost:3000` → Page de présentation de l'application SaaS
- `http://localhost:3000/admin` → Interface d’administration du **SaaS** (super admin uniquement)
- `http://test.localhost:3000` → Application pour l'organisation "test"
- `http://test.localhost:3000/admin` → Admin de l'organisation "test"
- `http://test2.localhost:3000` → Application pour l'organisation "test2"
- `http://test2.localhost:3000/admin` → Admin de l'organisation "test2"

> ℹ️ Le multi-tenant repose sur les sous-domaines. Assurez-vous que votre système (ou navigateur) supporte les domaines
> locaux comme `*.localhost`.

---

## 📬 Support

En cas de problème ou pour toute suggestion, vous pouvez ouvrir une issue ou me contacter directement.

---

Développé avec ❤️ par [Corentin Lempereur](https://github.com/Aredli16)
