# Generated by Django 4.0.6 on 2022-08-01 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clothmodel', '0002_cloth_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='cloth',
            name='userId',
            field=models.IntegerField(default=1, verbose_name='userId'),
        ),
    ]
