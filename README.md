# Personal Portfolio Website

A full-stack portfolio site: static HTML/CSS/JS frontend, an Express REST API backend, and MongoDB for storing projects and contact messages.

## Stack
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)

## Project Structure
```
portfolio-site/
├── public/              # Frontend (served as static files)
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
├── models/              # Mongoose schemas
│   ├── Project.js
│   └── Message.js
├── routes/              # Express API routes
│   ├── projects.js
│   └── contact.js
├── config/
│   ├── db.js            # MongoDB connection
│   └── seed.js          # Sample project seeder
├── server.js            # App entry point
├── package.json
└── .env.example
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file (copy `.env.example`) and add your MongoDB connection string:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/portfolioDB?retryWrites=true&w=majority
   ```
   You can get a free MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/atlas), or use `mongodb://localhost:27017/portfolioDB` if running MongoDB locally.

3. (Optional) Seed sample projects into the database:
   ```
   npm run seed
   ```

4. Start the server:
   ```
   npm start
   ```
   For auto-restart on changes during development:
   ```
   npm run dev
   ```

5. Open `http://localhost:5000` in your browser.

## API Endpoints

| Method | Route              | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/projects        | List all projects        |
| GET    | /api/projects/:id     | Get a single project     |
| POST   | /api/projects         | Create a project         |
| PUT    | /api/projects/:id     | Update a project         |
| DELETE | /api/projects/:id     | Delete a project         |
| POST   | /api/contact          | Submit a contact message |
| GET    | /api/contact          | List contact messages    |

## Customizing
- Update the hero text, about section, and skills list in `public/index.html`.
- Edit or add projects directly through MongoDB, the `npm run seed` script, or by POSTing to `/api/projects`.

## Deployment

**Option A — Heroku**
1. `heroku create your-app-name`
2. Set your MongoDB URI: `heroku config:set MONGO_URI=your_connection_string`
3. `git push heroku main`

**Option B — Render / Railway**
1. Connect your GitHub repo.
2. Set the `MONGO_URI` environment variable in the dashboard.
3. Build command: `npm install` — Start command: `npm start`

**Option C — Vercel/Netlify (frontend only)**
If you want to deploy the frontend separately from the API, host `public/` on Vercel or Netlify and deploy the Express API (server.js + routes + models) on Render, Railway, or Heroku. Update the `fetch` URLs in `public/js/main.js` to point to your deployed API's full URL instead of relative paths.

## Notes
- Use MongoDB Atlas's free tier for a no-cost hosted database.
- Remember to whitelist your deployment platform's IP (or use 0.0.0.0/0 for simplicity) in MongoDB Atlas network access settings.
