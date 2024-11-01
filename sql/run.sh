#!/bin/bash
sed -i "s/DATABASE_USER_SUPERSET/${DATABASE_USER_SUPERSET}/g" /tmp/scripts/00_create_superset_user.sql 
sed -i "s/DATABASE_PASSWORD_SUPERSET/${DATABASE_PASSWORD_SUPERSET}/g" /tmp/scripts/00_create_superset_user.sql
sed -i "s/DATABASE_DB_SUPERSET/${DATABASE_DB_SUPERSET}/g" /tmp/scripts/00_create_superset_user.sql
cat /tmp/scripts/00_create_superset_user.sql
psql -U ${DATABASE_USER_POSTGRES}  -f /tmp/scripts/00_create_superset_user.sql
psql -U ${DATABASE_USER_POSTGRES} -d ${DATABASE_NAME_POSTGRES} -f /tmp/scripts/01_create_script.sql
psql -U ${DATABASE_USER_POSTGRES} -d ${DATABASE_NAME_POSTGRES} -f /tmp/scripts/02_populate_permission_table.sql
psql -U ${DATABASE_USER_POSTGRES} -d ${DATABASE_NAME_POSTGRES} -f /tmp/scripts/03_populate_type_navire_table.sql
psql -U ${DATABASE_USER_POSTGRES} -d ${DATABASE_NAME_POSTGRES} -f /tmp/scripts/04_populate_user_table_with_default_admin_account.sql
#psql -U ${DATABASE_USER_POSTGRES} -d ${DATABASE_NAME_POSTGRES} -f /tmp/scripts/05_populate_ship_list_table.sql
rm -rf /tmp/scripts