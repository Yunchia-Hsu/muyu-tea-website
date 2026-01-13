# 🚀 Muyu Tea - 開發指南

## 快速啟動指令

### 方法 1: 使用 Shell 腳本（推薦）

```bash
# 進入專案根目錄
cd ~/Desktop/muyu_github

# 啟動所有服務（PostgreSQL + Backend + Frontend）
./start-all.sh

# 停止所有服務
./stop-all.sh

# 查看所有服務狀態
./status-all.sh
```

### 方法 2: 使用 npm 指令

```bash
# 進入專案根目錄
cd ~/Desktop/muyu_github

# 同時啟動所有服務
npm run dev

# 停止所有服務
npm run stop

# 查看狀態
npm run status
```

---

## 📋 所有可用指令

### 安裝相關
```bash
npm run install:backend   # 只安裝 Backend 依賴
npm run install:frontend  # 只安裝 Frontend 依賴
npm run install:all       # 安裝所有依賴
```

### 開發相關
```bash
npm run dev               # 同時啟動 DB + Backend + Frontend
npm run dev:db            # 只啟動資料庫
npm run dev:backend       # 只啟動 Backend
npm run dev:frontend      # 只啟動 Frontend
npm run stop              # 停止所有服務
npm run status            # 查看所有服務狀態
```

### 建置相關
```bash
npm run build             # 建置 Backend + Frontend
npm run build:backend     # 只建置 Backend
npm run build:frontend    # 只建置 Frontend
```

### 清理相關
```bash
npm run clean             # 清理所有 node_modules 和 dist
```

---

## 🌐 服務端口

| 服務 | 端口 | URL |
|------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 3000 | http://localhost:3000 |
| PostgreSQL | 5432 | localhost:5432 |
| Swagger API Docs | 3000 | http://localhost:3000/api-doc |

---

## 📁 專案結構

```
muyu_github/
├── backend/              # Express.js Backend
│   ├── src/
│   │   ├── controllers/  # API 控制器
│   │   ├── routes/       # 路由定義
│   │   ├── services/     # 業務邏輯
│   │   ├── middlewares/  # 中間件
│   │   └── index.ts      # 入口文件
│   └── package.json
│
├── frontend/             # React + Vite Frontend
│   ├── src/
│   │   ├── components/   # React 組件
│   │   ├── pages/        # 頁面
│   │   └── services/     # API 調用
│   └── package.json
│
├── start-all.sh          # 啟動所有服務
├── stop-all.sh           # 停止所有服務
├── status-all.sh         # 查看服務狀態
└── package.json          # Root 配置
```

---

## 🐛 常見問題

### Q: 啟動失敗怎麼辦？

1. **檢查服務狀態**
   ```bash
   ./status-all.sh
   ```

2. **查看 PostgreSQL 日誌**
   ```bash
   tail -50 /opt/homebrew/var/log/postgresql@16.log
   ```

3. **停止所有服務後重新啟動**
   ```bash
   ./stop-all.sh
   sleep 2
   ./start-all.sh
   ```

### Q: 端口被佔用怎麼辦？

```bash
# 查看佔用 3000 端口的程序
lsof -i :3000

# 殺掉該程序（替換 PID）
kill -9 <PID>
```

### Q: 如何重置資料庫？

```bash
# 連接到資料庫
psql -d muyu_tea

# 刪除所有資料表
DROP TABLE enrollments, courses, users CASCADE;

# 重新建立資料表（參考安裝文檔）
```

---

## 🔧 開發工作流程

### 1. 第一次設置
```bash
cd ~/Desktop/muyu_github
npm run install:all
```

### 2. 每日開發
```bash
# 啟動
./start-all.sh

# 開發...

# 停止（或按 Ctrl+C）
./stop-all.sh
```

### 3. 提交前檢查
```bash
# 確保所有服務運行正常
./status-all.sh

# 測試 API
curl http://localhost:3000/api/courses

# 測試前端
open http://localhost:5173
```

---

## 📝 環境變數

### Backend (.env)
```env
PORT=3000
DATABASE_URL=postgresql://yun-chiahsu@localhost:5432/muyu_tea
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 部署到 AWS

（待完成）

---

## 📞 支援

遇到問題？查看：
- Backend 錯誤：檢查終端 Backend 輸出
- Frontend 錯誤：檢查瀏覽器 Console
- 資料庫錯誤：查看 PostgreSQL 日誌

---

**Happy Coding! ☕🍵**
