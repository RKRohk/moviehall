pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            telegramSend(message: 'starting build', chatId: 162889325)
            sh 'echo $USER && docker build . -t sample'
          }
        }

        stage('Testing config') {
          steps {
            sh 'echo $USER'
          }
        }

      }
    }

  }
}