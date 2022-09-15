# Generated by Django 4.0.6 on 2022-09-05 08:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('codimodel', '0005_codi_cap_codi_footwear'),
    ]

    operations = [
        migrations.CreateModel(
            name='CodiPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.IntegerField(default=1, verbose_name='userId')),
                ('plan_date', models.DateField(verbose_name='date')),
                ('codi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='codimodel.codi')),
            ],
            options={
                'ordering': ('plan_date', 'id'),
            },
        ),
    ]