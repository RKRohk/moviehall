pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        telegramSend(message: 'starting build', chatId: 162889325)
        sh 'docker build . -t sample'
      }
    }

  }
}