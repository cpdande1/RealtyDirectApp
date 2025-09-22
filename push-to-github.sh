#!/bin/bash

echo "🚀 Pushing RealtyDirect to GitHub..."

# Set the repository URL
REPO_URL="https://github.com/cpdande1/RealtyDirect.git"

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit if there are changes
if ! git diff --staged --quiet; then
    echo "💾 Committing changes..."
    git commit -m "🚀 RealtyDirect - Complete real estate marketplace with RECO education"
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/cpdande1/RealtyDirect"
echo "🎉 Ready for deployment!"

