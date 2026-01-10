# 🚀 Настройка GitHub Pages

## Шаг 1: Настройка GitHub Pages в репозитории

1. Перейдите в ваш репозиторий: https://github.com/Z-oobastik-s/zrgbminecraft
2. Нажмите **Settings** (в верхнем меню репозитория)
3. В левом меню найдите **Pages** (в разделе Code and automation)
4. В разделе **Source** выберите:
   - **Source**: `GitHub Actions` ✅
   - НЕ выбирайте "Deploy from a branch"

## Шаг 2: Проверка GitHub Actions

1. Перейдите на вкладку **Actions** в вашем репозитории
2. После первого push должен запуститься workflow **"Deploy to GitHub Pages"**
3. Дождитесь завершения (обычно 2-3 минуты)
4. Если есть ошибки - проверьте логи

## Шаг 3: Доступ к сайту

После успешного деплоя ваш сайт будет доступен по адресу:

**https://z-oobastik-s.github.io/zrgbminecraft/**

## ⚠️ Важно

- **Используйте GitHub Actions**, а не "Deploy from a branch"
- Workflow автоматически запустится при каждом push в ветку `main`
- Первый деплой может занять 3-5 минут
- После деплоя сайт обновится автоматически

## 🔧 Если что-то не работает

1. Проверьте вкладку **Actions** - там будут видны ошибки
2. Убедитесь, что в Settings → Pages выбран **GitHub Actions**
3. Проверьте, что workflow файл находится в `.github/workflows/deploy.yml`
4. Убедитесь, что в `next.config.js` правильный `basePath: '/zrgbminecraft'`

