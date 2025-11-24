#!/bin/bash
# Git hooks 설치 스크립트

if [ "$GITHUB_ACTIONS" = "true" ]; then
  echo "Skipping git hooks installation in GitHub Actions"
  exit 0
fi

echo "📦 Git hooks 설치 중..."

# hook 파일들  복사
for hook in .githooks/*; do
  if [ -f "$hook" ] && [ "$(basename "$hook")" != "install.sh" ]; then
    hook_name=$(basename "$hook")
    cp "$hook" ".git/hooks/$hook_name"
    chmod +x "$hook"
    chmod +x ".git/hooks/$hook_name"
    echo "   ✔︎ Installed: $hook_name"
  fi
done

echo "✨ Git hooks 설치 완료!"
