@echo off
REM Delete the old gh-pages branch
git branch -D gh-pages 2>nul
git push origin --delete gh-pages 2>nul

REM Create a temp worktree directory and push dist files as gh-pages
mkdir .gh-deploy 2>nul
git worktree add .gh-deploy gh-pages 2>nul || (git worktree add --orphan .gh-deploy gh-pages)

REM Copy built files into the worktree
xcopy /E /I /Y artifacts\tasteful\dist\public\* .gh-deploy\

REM Commit and push from within the worktree
cd .gh-deploy
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
cd ..

REM Cleanup
git worktree remove .gh-deploy --force
