# Generated by Django 4.0.6 on 2022-07-27 01:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codimodel', '0002_rename_cody_codi'),
    ]

    operations = [
        migrations.RenameField(
            model_name='codi',
            old_name='bottom_id',
            new_name='bottom',
        ),
        migrations.RenameField(
            model_name='codi',
            old_name='top_id',
            new_name='top',
        ),
    ]
