#!/bin/sh
#!/bin/bash


echo "[RUN] running migrations."
python manage.py makemigrations --merge
python manage.py migrate --noinput

echo "[RUN] running application."
python manage.py runserver 0.0.0.0:8000