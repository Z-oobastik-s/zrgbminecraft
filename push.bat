@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"

set "GITHUB_OWNER=Z-oobastik-s"
set "GITHUB_REPO=zrgbminecraft"
set "BRANCH=main"
set "REPO_URL=https://github.com/%GITHUB_OWNER%/%GITHUB_REPO%.git"

echo.
echo ======================================
echo   Push to GitHub
echo ======================================
echo.
echo Dir: %CD%
echo Repo: %REPO_URL%
echo.

echo [1/9] Project folder...
if not exist "app\" (
    echo [ERROR] No folder "app". Run push.bat from project root ^(next to package.json^).
    goto :END_FAIL
)
if not exist "package.json" (
    echo [ERROR] No package.json here.
    goto :END_FAIL
)
echo [OK] app + package.json
echo.

echo [2/9] Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not in PATH. Install from https://nodejs.org/
    goto :END_FAIL
)
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not in PATH.
    goto :END_FAIL
)
echo [OK] node + npm
echo.

echo [3/9] npm install ^(updates package-lock.json^)...
call npm install --no-audit --no-fund
if errorlevel 1 (
    echo [ERROR] npm install failed.
    goto :END_FAIL
)
echo [OK] node_modules + package-lock.json
echo.

echo [4/9] Token...
if not exist "github-token.txt" (
    echo [ERROR] Create github-token.txt with one line = PAT. See github-token.example.txt
    goto :END_FAIL
)
set /p GITHUB_TOKEN=<github-token.txt
if "%GITHUB_TOKEN%"=="" (
    echo [ERROR] github-token.txt is empty.
    goto :END_FAIL
)
echo [OK] Token loaded
echo.

echo [5/9] Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git not installed.
    goto :END_FAIL
)
echo [OK] Git found
echo.

echo [6/9] Init...
if not exist ".git" (
    git init -b %BRANCH%
    echo [OK] git init
) else (
    echo [OK] .git exists
)
echo.

git config user.name >nul 2>&1
if %errorlevel% neq 0 git config user.name "Zoobastiks"
git config user.email >nul 2>&1
if %errorlevel% neq 0 git config user.email "zoobastiks.developer@gmail.com"
echo [OK] user.name / user.email
echo.

echo [7/9] Remote with token...
set "REPO_URL_WITH_TOKEN=https://%GITHUB_TOKEN%@github.com/%GITHUB_OWNER%/%GITHUB_REPO%.git"
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    git remote set-url origin "%REPO_URL_WITH_TOKEN%"
    echo [OK] origin URL updated
) else (
    git remote add origin "%REPO_URL_WITH_TOKEN%"
    echo [OK] origin added
)
echo.

if not exist ".gitattributes" (
    echo * text=auto eol=lf> .gitattributes
    echo [OK] .gitattributes created
)

echo [8/9] Stage files...
git rm -r --cached . 2>nul
REM One add: respects .gitignore (no token, no node_modules). No missing pathspec (ex. build-github.cmd).
git add -A
if errorlevel 1 (
    echo [ERROR] git add failed.
    goto :END_FAIL
)
echo [OK] git add done
echo.

echo   commit...
set "HAS_CHANGES="
for /f "delims=" %%s in ('git status --porcelain') do set "HAS_CHANGES=1"
if not defined HAS_CHANGES (
    echo [OK] Nothing to commit
    goto :after_commit
)
git status --short
git commit -m "Update: %date% %time%"
if %errorlevel% neq 0 (
    echo [WARNING] commit failed or empty
) else (
    echo [OK] Commit OK
)
:after_commit
echo.

echo   check .env...
git diff --cached --name-only 2>nul | findstr /i "\.env" >nul 2>&1
if %errorlevel% equ 0 (
    echo [SECURITY] .env is staged. Abort.
    git reset HEAD >nul 2>&1
    goto :END_FAIL
)
echo [OK] no .env in index
echo.

echo [9/9] Push...
for /f "tokens=*" %%a in ('git branch --show-current 2^>nul') do set "CURRENT_BRANCH=%%a"
if not defined CURRENT_BRANCH (
    git branch -M %BRANCH%
    set "CURRENT_BRANCH=%BRANCH%"
)
if /I not "!CURRENT_BRANCH!"=="%BRANCH%" (
    git branch -M %BRANCH%
)
git push -u origin %BRANCH% --force
set "PUSH_SUCCESS=%errorlevel%"
echo.

if %PUSH_SUCCESS% neq 0 (
    echo [ERROR] Push failed.
    git remote set-url origin "%REPO_URL%"
    goto :END_FAIL
)

echo Remove token from remote URL...
git remote set-url origin "%REPO_URL%"
echo [OK] Remote without token: %REPO_URL%
echo.
echo Done: https://github.com/%GITHUB_OWNER%/%GITHUB_REPO%
echo.
goto :END_OK

:END_FAIL
echo.
echo ---------- FAILED ----------
echo.
pause
endlocal
exit /b 1

:END_OK
echo.
echo ---------- OK ----------
echo.
pause
endlocal
exit /b 0
