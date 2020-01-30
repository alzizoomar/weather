git reset --hard
git pull
npm i
npm run  build
rm -fr /var/www/www.weather.co
cp -fr ./dist/weather/. /var/www/www.weather.co
