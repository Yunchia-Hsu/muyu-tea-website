#!/bin/bash

echo "🔍 Muyu Tea 全端應用狀態"
echo "================================"
echo ""

# 1. PostgreSQL 狀態
echo "1️⃣  PostgreSQL:"
if lsof -i :5432 > /dev/null 2>&1; then
    echo "   ✅ 運行中"
    lsof -i :5432 | grep LISTEN
else
    echo "   ❌ 未運行"
fi
echo ""

# 2. Backend 狀態
echo "2️⃣  Backend (Port 3000):"
if lsof -i :3000 > /dev/null 2>&1; then
    echo "   ✅ 運行中"
    lsof -i :3000 | grep LISTEN
else
    echo "   ❌ 未運行"
fi
echo ""

# 3. Frontend 狀態
echo "3️⃣  Frontend (Port 5173):"
if lsof -i :5173 > /dev/null 2>&1; then
    echo "   ✅ 運行中"
    lsof -i :5173 | grep LISTEN
else
    echo "   ❌ 未運行"
fi
echo ""

# 總結
echo "================================"
DB_STATUS=$(lsof -i :5432 > /dev/null 2>&1 && echo "✅" || echo "❌")
BE_STATUS=$(lsof -i :3000 > /dev/null 2>&1 && echo "✅" || echo "❌")
FE_STATUS=$(lsof -i :5173 > /dev/null 2>&1 && echo "✅" || echo "❌")

echo "總結: DB:$DB_STATUS Backend:$BE_STATUS Frontend:$FE_STATUS"

if lsof -i :5432 > /dev/null 2>&1 && lsof -i :3000 > /dev/null 2>&1 && lsof -i :5173 > /dev/null 2>&1; then
    echo ""
    echo "🎉 所有服務都在運行！"
    echo "📱 Frontend: http://localhost:5173"
    echo "🔌 Backend API: http://localhost:3000"
    echo "🗄️  Database: localhost:5432"
fi
