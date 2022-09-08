#!/bin/sh
#!/bin/bash

echo "[RUN] Running migrations."
python manage.py makemigrations
python manage.py migrate

echo "[RUN] Insert initial data"
python manage.py loaddata data.json

echo "[RUN] Start Application."
python manage.py runserver 0.0.0.0:8000
