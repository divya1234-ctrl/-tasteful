@echo off
cd C:\Users\motir\Downloads\tasteful-deploy
copy /Y index.html 404.html
git add 404.html
git commit -m "Update 404.html"
git push origin gh-pages
