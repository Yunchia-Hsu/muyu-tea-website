#!/bin/bash

echo "🔍 Muyu Tea Full-Stack Application Status"
echo "================================"
echo ""

# 1. PostgreSQL Status
echo "1️⃣  PostgreSQL:"
if lsof -i :5432 > /dev/null 2>&1; then
    echo "   ✅ Running"
    lsof -i :5432 | grep LISTEN
else
    echo "   ❌ Not running"
fi
echo ""

# 2. Backend Status
echo "2️⃣  Backend (Port 3000):"
if lsof -i :3000 > /dev/null 2>&1; then
    echo "   ✅ Running"
    lsof -i :3000 | grep LISTEN
else
    echo "   ❌ Not running"
fi
echo ""

# 3. Frontend Status
echo "3️⃣  Frontend (Port 5173):"
if lsof -i :5173 > /dev/null 2>&1; then
    echo "   ✅ Running"
    lsof -i :5173 | grep LISTEN
else
    echo "   ❌ Not running"
fi
echo ""

# Summary
echo "================================"
DB_STATUS=$(lsof -i :5432 > /dev/null 2>&1 && echo "✅" || echo "❌")
BE_STATUS=$(lsof -i :3000 > /dev/null 2>&1 && echo "✅" || echo "❌")
FE_STATUS=$(lsof -i :5173 > /dev/null 2>&1 && echo "✅" || echo "❌")

echo "Summary: DB:$DB_STATUS Backend:$BE_STATUS Frontend:$FE_STATUS"

if lsof -i :5432 > /dev/null 2>&1 && lsof -i :3000 > /dev/null 2>&1 && lsof -i :5173 > /dev/null 2>&1; then
    echo ""
    echo "All services are running!"
    echo "Frontend: http://localhost:5173"
    echo "Backend API: http://localhost:3000"
    echo " Database: localhost:5432"
fi
