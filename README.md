# excel4pro.ru

Сайт школы excel4pro и материалы курсов по Excel + ИИ.

Первый курс: **"Нейросети для работы с Excel"**, ведёт Филипп Акунья-Герреро.

## Структура

```
site/                       # всё, что уезжает на хостинг (корень домена)
  index.html                # лендинг курса
  assets/css/style.css
  assets/js/main.js         # тут же ссылки на оплату (PAY_LINKS)
  assets/img/               # постер видео, фото автора
  assets/video/             # фрагмент урока (720p, faststart)
  favicon.svg, robots.txt, sitemap.xml, .htaccess
materials/                  # материалы курсов (датасеты, шаблоны), на сайт не выкладываются
.github/workflows/          # автодеплой на Beget
```

Сайт статический: чистые HTML, CSS и JS без сборки. Открыть локально:

```bash
cd site && python3 -m http.server 8000
# http://localhost:8000
```

## Ссылки на оплату

В `site/assets/js/main.js` в начале файла объект `PAY_LINKS`. Пока ссылки пустые, кнопки "Купить" показывают уведомление "Оплата откроется совсем скоро".

## Деплой на Beget

**Вариант 1, автоматически из GitHub.** При каждом пуше в `main`, где менялась папка `site/`, Action заливает её по FTP.

1. В панели Beget: Сайты -> привязать домен `excel4pro.ru`, затем FTP -> создать FTP-аккаунт с доступом к папке сайта.
2. В GitHub: Settings -> Secrets and variables -> Actions -> New repository secret:
   - `BEGET_FTP_SERVER` - FTP-хост из панели Beget
   - `BEGET_FTP_USERNAME`, `BEGET_FTP_PASSWORD`
   - `BEGET_FTP_DIR` (опционально) - папка на сервере, по умолчанию `excel4pro.ru/public_html/`
3. Actions -> "Deploy site to Beget" -> Run workflow.

Пока секретов нет, workflow просто пропускает деплой.

**Вариант 2, руками.** Залить содержимое `site/` в `excel4pro.ru/public_html/` через файловый менеджер Beget или FTP. Важно залить и скрытый `.htaccess`.

## TODO

- [ ] Ссылки на оплату (2 900 ₽ и 17 900 ₽)
- [ ] Регалии и опыт Филиппа в блок "Автор"
- [ ] Оферта, политика конфиденциальности, контакты в футер
- [ ] Яндекс Метрика и вебмастер
