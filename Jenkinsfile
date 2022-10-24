
pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/1919teja/nodejs-api-dockerization-paytm.git'
      }
    }
     
    stage('install  dependencies ') {
      steps {
        bat ' npm install express ejs  '
      } 
    }
     
	stage('stop the existing container services ') {
      steps {
         bat 'start cmd.exe /c containerstop.bat '
      }
    }	

	stage('remove docker cache ') {
      steps {
         bat 'docker system  prune --force'
      }
    }
        
    stage('remove existing containers  ') {
      steps {
        bat ' docker container  prune --force '
      }
    }
    stage('remove existing image ') {
      steps {
        bat ' docker image prune --force '
      }
    }
	
	stage('remove Docker Cache ') {
      steps {
        bat ' docker system  prune --force '
      }     
    }
	
	stage('Docker Image') {
      steps {
        bat 'docker build -t  paytmdockerimage . '
      }
    }
		stage('Docker Container build ') {
      steps {
        bat 'docker run -d --publish 2222:2222  paytmdockerimage '
      }
    }
  }
}
