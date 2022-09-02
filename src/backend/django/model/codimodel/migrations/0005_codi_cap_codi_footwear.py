# Generated by Django 4.0.6 on 2022-08-23 06:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clothmodel', '0003_cloth_userid'),
        ('codimodel', '0004_codi_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='codi',
            name='cap',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cap_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AddField(
            model_name='codi',
            name='footwear',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='footwear_cloth_req', to='clothmodel.cloth'),
        ),
    ]