# Generated by Django 4.1.2 on 2022-11-10 07:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clothmodel', '0004_cloth_isdeleted'),
        ('codimodel', '0009_alter_codi_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='codi',
            name='bag',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bag_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AddField(
            model_name='codi',
            name='outer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='outer_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AlterField(
            model_name='codi',
            name='bottom',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bottom_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AlterField(
            model_name='codi',
            name='cap',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cap_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AlterField(
            model_name='codi',
            name='footwear',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='footwear_cloth_req', to='clothmodel.cloth'),
        ),
        migrations.AlterField(
            model_name='codi',
            name='top',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='top_cloth_req', to='clothmodel.cloth'),
        ),
    ]
