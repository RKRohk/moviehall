pipeline {
  agent none
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            telegramSend(message: 'starting build', chatId: 162889325)
            sh 'docker build . -t sample'
          }
        }

        stage('Testing config') {
          steps {
            sh '''/bin/bash

echo $USER

ls

pwd'''
          }
        }

      }
    }

  }
}