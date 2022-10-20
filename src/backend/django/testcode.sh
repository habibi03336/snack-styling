#!/bin/sh
#!/bin/bash

echo "[DB] Running DB update..."
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata data.json

echo "[Test] Running Test code..."
python manage.py test
