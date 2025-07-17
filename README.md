# 🍰 Custom Cakes Upload App

A full-stack image cake ordering app that allows users to upload custom images for cake printing, write messages, select sizes, and schedule pickup. Admins can view orders and manage the system via a dedicated dashboard.

---

## 🧱 Tech Stack

**Frontend**

* React + TypeScript
* Tailwind CSS
* Vite
* Component library: custom UI components + ShadCN-style patterns

**Backend**

* Node.js + Express
* PostgreSQL (via Docker)
* Multer for image uploads
* JWT-based authentication

**Dev Tools**

* Docker + docker-compose
* ESLint + Prettier
* pgAdmin (optional, for DB inspection)

---

## 🚀 Getting Started

### 1. Clone & Setup

```bash
git clone https://github.com/your-org/custom-cakes-upload.git
cd custom-cakes-upload
```

### 2. Environment Config

`.env` file is already included in version control. Review and update the values in `/backend/.env` as needed:

```env
DATABASE_URL=postgresql://cakeuser:cakepass@postgres:5432/cakeapp
JWT_SECRET=your-secret-key-here-change-in-production
PORT=5000
```

Make sure the DB credentials match your `docker-compose.yml`.

---

### 3. Run with Docker

```bash
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)
* DB Admin (optional): pgAdmin via your local config

---

## 📂 Project Structure

```
custom-cakes-upload/
├── backend/          # Express API, DB init, image uploads
├── src/              # React app
│   ├── components/   # UI components
│   ├── pages/        # Page-level components
│   ├── services/     # API logic
│   ├── contexts/     # Global context providers
│   ├── hooks/        # Custom hooks
├── public/           # Static assets
├── docker-compose.yml
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🔐 Authentication

* Register & login system using bcrypt + JWT.
* Role-based access (`admin`, `user`).
* Admin users can view/manage all orders.

---

## 📸 Upload Flow

1. User uploads an image.
2. Adds message, selects cake size, and delivery date.
3. Submits the order (stored in DB with image path).
4. Confirmation screen + optional email (TBD).

---

## 🛠 Admin Features (WIP)

* View all submitted orders
* Manage user roles and statuses
* Track image uploads

---

## 📋 TODO

* [ ] Email confirmation system
* [ ] Image validation and cropping
* [ ] Admin dashboard filters/sorting
* [ ] CI/CD pipeline
* [ ] Role-based route protection

---

## 👥 Contributing

1. Fork repo
2. Make a new branch (`feature/your-feature`)
3. PR into `main` with a detailed description

---

## 📄 License

MIT – free to use, modify, print cakes.
