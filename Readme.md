# to run app without docker  run the below commands from app directory

   node app.js 
   
   #####  to run app in background  with nohup tool 
    nohup node app.js  >  output.log &
    
    ## to run code in background  with pm2 

    npm install pm2 -g 

    pm2 start app.js








### to run app with docker 

 npm install express ejs


docker build -t node-docker

docker run -d  --publish 2222:2222  node-docker



