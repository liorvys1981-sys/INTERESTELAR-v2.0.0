#!/bin/bash
# INTERESTELAR v2.0.0 — Quick Deploy Script

echo "===================================="
echo "  INTERESTELAR v2.0.0 Deploy"
echo "===================================="

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "ERROR: Node.js 20+ required. Found: $(node -v)"
    exit 1
fi

echo "[1/5] Installing dependencies..."
npm install

echo "[2/5] Type checking..."
npm run check

echo "[3/5] Building for production..."
npm run build

echo "[4/5] Build complete. Output: dist/public/"
echo "[5/5] Ready to deploy!"
echo ""
echo "Deploy options:"
echo "  - Static: Upload dist/public/ to Vercel/Netlify/S3"
echo "  - Full-stack: npm start (requires MySQL + .env)"
echo ""
echo "Admin Panel: /#/login"
echo "  Username: admin"
echo "  Password: interestelar2024"
echo ""
echo "Done!"
