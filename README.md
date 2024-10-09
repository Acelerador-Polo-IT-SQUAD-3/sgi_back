# sgi_back

# INSTALACION DEL PROYECTO
git clone 
cd sgi_back
npm install

# CONFIGURACIONES LOCALES (.env)
DB_HOST=ip de la base de datos mysql 
DB_USER=usuario de base de datos mysql
DB_PASSWORD=password de la base de datos mysql
DB_PORT=puerto de la base de datos mysql
DB_DATABASE=esquema/nombre de la base de datos mysql
CORS_ORIGIN=url del frontend que accederá a los servicios
MAIL_ADMIN= email 
MAIL_HOST= sandbox.smtp.mailtrap.io
MAIL_PORT= 2525
MAIL_USER= usuario del mail
MAIL_PASS= password del mail

# EJECUTAR EL PROYECTO (desde sgi_front/front_end)
npm run dev

# START COMMAND PARA DEPLOY (desde sgi_front/front_end)
node index.js

# LISTO!!