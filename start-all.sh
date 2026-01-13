#!/bin/bash

echo "🚀 啟動 Muyu Tea 全端應用..."
echo "================================"
echo ""

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在 muyu_github 根目錄執行此腳本"
    exit 1
fi

# 1. 啟動 PostgreSQL
echo "1️⃣  啟動 PostgreSQL..."
~/postgres-start.sh
echo ""

# 等待 PostgreSQL 完全啟動
sleep 2

# 2. 啟動 Backend 和 Frontend
echo "2️⃣  啟動 Backend 和 Frontend..."
echo ""
npm run dev

# 如果按下 Ctrl+C，清理所有進程
trap 'echo ""; echo "🛑 正在停止所有服務..."; npm run stop; exit' INT TERM
