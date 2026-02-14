#  Muyu Tea - Development Guide



### use npm commands
```bash
# Navigate to the project root directory
cd ~/Desktop/muyu_github

# Start all services
npm run dev

# Stop all services
npm run stop

# Check service status
npm run status
```


## Available Commands

### Installation
```bash
npm run install:backend   # Install Backend dependencies only
npm run install:frontend  # Install Frontend dependencies only
npm run install:all       # Install all dependencies
```



### Development
```bash
npm run dev               # Start DB + Backend + Frontend
npm run dev:db            # Start database only
npm run dev:backend       # Start Backend only
npm run dev:frontend      # Start Frontend only
npm run stop              # Stop all services
npm run status            # Check status of all services
```

### Build
```bash
npm run build             # Build Backend + Frontend
npm run build:backend     # Build Backend only
npm run build:frontend    # Build Frontend only
```

### Clean
```bash
npm run clean             # Remove all node_modules and dist folders
```

---

## Service Ports

| Service | Port | URL |
|------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |
| Swagger API Docs | 3000 | http://localhost:3000/api-doc |

---

## Project Structure

```
muyu_github/
├── backend/              # Express.js Backend
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   ├── routes/       # Route definitions
│   │   ├── services/     # Business logic
│   │   ├── middlewares/  # Middlewares
│   │   └── index.ts      # Entry point
│   └── package.json
│
├── frontend/             # React + Vite Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Pages
│   │   └── services/     # API calls
│   └── package.json
│
├── start-all.sh          # Start all services
├── stop-all.sh           # Stop all services
├── status-all.sh         # Check service status
└── package.json          # Root configuration
```

---

## 🐛 Common Issues

### Q: Check service status

1. **Check service status**
   ```bash
   ./status-all.sh
   ```

2. **Check PostgreSQL logs**
   ```bash
   tail -50 /opt/homebrew/var/log/postgresql@16.log
   ```

3. **Stop all services and restart**
   ```bash
   ./stop-all.sh
   sleep 2
   ./start-all.sh
   ```

### Q: What if a port is already in use?

```bash
# Check which process is using port 3000
lsof -i :3000

# Kill the process (replace PID)
kill -9 <PID>
```

### Q: How do I reset the database?

```bash
# Connect to database
psql -d muyu_tea

# Drop all tables
DROP TABLE enrollments, courses, users CASCADE;



---

## Development Workflow

### 1. Initial Setup
```bash
cd ~/Desktop/muyu_github
npm run install:all
```


# Test API
curl http://localhost:3000/api/courses

# Test Frontend
open http://localhost:5173
```

---

## Environment Variables

### Backend (.env)
```env
PORT=3000
JWT_SECRET=your_super_secret_key
DATABASE_URL=postgresql://localhost:5432/muyu_tea
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```



