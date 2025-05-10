# CineVerse Backend

A Node.js backend for a media platform, built with Express, TypeScript, Prisma ORM, and PostgreSQL.  
Supports user authentication, media management, reviews, comments, purchases, and more.

---

## Features

- **User Authentication** (JWT-based)
- **Media Management** (Movies/Series)
- **Reviews & Comments** (with likes and replies)
- **Purchases & Watchlist**
- **Role-based Access Control** (User/Admin)
- **Prisma ORM** with PostgreSQL

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ZH-Jihan/Movie-Server-Backend
cd Movie-Server-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
SALT_ROUNDS=10
```

### 4. Set Up the Database

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 5000).

---

## API Documentation

### **Auth**

| Method | Endpoint             | Description         | Body/Params                 | Auth Required |
| ------ | -------------------- | ------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user | `{ name, email, password }` | No            |
| POST   | `/api/auth/login`    | Login and get JWT   | `{ email, password }`       | No            |

---

### **Media**

| Method | Endpoint              | Description        | Body/Params  | Auth Required |
| ------ | --------------------- | ------------------ | ------------ | ------------- |
| GET    | `/api/media`          | Get all media      | Query params | No            |
| POST   | `/api/media`          | Create new media   | Media object | Admin         |
| GET    | `/api/media/features` | Get featured media |              | No            |
| GET    | `/api/media/:id`      | Get media by ID    |              | No            |
| PUT    | `/api/media/:id`      | Update media by ID | Media object | Admin         |
| DELETE | `/api/media/:id`      | Delete media by ID |              | Admin         |

---

### **User**

| Method | Endpoint                       | Description           | Body/Params   | Auth Required |
| ------ | ------------------------------ | --------------------- | ------------- | ------------- |
| GET    | `/api/user/profile`            | Get user profile      |               | User/Admin    |
| GET    | `/api/user/watchlist`          | Get user watchlist    |               | User/Admin    |
| POST   | `/api/user/watchlist`          | Add to watchlist      | `{ mediaId }` | User/Admin    |
| DELETE | `/api/user/watchlist/:mediaId` | Remove from watchlist |               | User/Admin    |

---

### **Review**

| Method | Endpoint                  | Description           | Body/Params   | Auth Required |
| ------ | ------------------------- | --------------------- | ------------- | ------------- |
| POST   | `/api/review`             | Create a review       | Review object | User          |
| GET    | `/api/review/:mediaId`    | Get reviews for media |               | No            |
| POST   | `/api/review/:id/approve` | Approve review        |               | Admin         |
| POST   | `/api/review/:id/approve` | Like a review         |               | User          |

---

### **Comment**

| Method | Endpoint                 | Description             | Body/Params    | Auth Required |
| ------ | ------------------------ | ----------------------- | -------------- | ------------- |
| POST   | `/api/comment`           | Add a comment           | Comment object | User/Admin    |
| POST   | `/api/comment/:reviewId` | Get comments for review |                | No            |

---

**Note:**

- All protected routes require a valid JWT in the `Authorization` header as `Bearer <token>`.
- Replace `/api/` with your actual API prefix if different.

---

## Prisma Schema

- **User, Media, Review, Comment, ReviewLike, Watchlist, Purchase** models
- Enums for roles, media types, purchase types, and statuses

See `prisma/schema.prisma` for full details.

---

## Scripts

- `npm run dev` — Start the development server with hot reload
- `npm run build` — Build the TypeScript project (also runs `prisma generate`)
- `npx prisma migrate dev` — Run database migrations
- `npx prisma generate` — Generate Prisma client

---

## Deployment

- Ensure your build process runs `prisma generate` before starting the server.
- Set all required environment variables in your deployment environment.

---

## Troubleshooting

- If you see `@prisma/client did not initialize yet`, run:
  ```bash
  npx prisma generate
  ```
- Ensure your `.env` file is present and correct.
- Check that your database is running and accessible.

---

## License

MIT
