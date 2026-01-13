#!/bin/bash

echo "🛑 停止 Muyu Tea 全端應用..."
echo "================================"
echo ""

# 1. 停止 Frontend (Vite)
echo "1️⃣  停止 Frontend..."
pkill -f 'vite' 2>/dev/null && echo "✅ Frontend 已停止" || echo "⚠️  Frontend 沒有運行"

# 2. 停止 Backend (ts-node-dev)
echo "2️⃣  停止 Backend..."
pkill -f 'ts-node-dev' 2>/dev/null && echo "✅ Backend 已停止" || echo "⚠️  Backend 沒有運行"

# 3. 停止 PostgreSQL
echo "3️⃣  停止 PostgreSQL..."
~/postgres-stop.sh

echo ""
echo "✅ 所有服務已停止"
