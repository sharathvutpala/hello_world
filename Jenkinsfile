// def secrets = [
//     [path: 'cryptanalysis/oc-tokens', engineVersion: 2, secretValues: [
//         [envVar: 'auto-cryptanalysis', vaultKey: 'auto-cryptanalysis']
//     ]]
// ]
pipeline{
    agent {
        node {
            label 'base-agent'
        }
    }
    stages {
        // stage('Build and push docker image') {
        //     steps {
        //         script {
        //             withVault(configuration: [timeout: 60, vaultCredentialId: 'cryptanalysis_approle_id'], vaultSecrets: secrets) {
        //                 print(auto-cryptanalysis)
        //             }
        //         }
        //     }
        // }
        stage('Copy Files to GitHub on Release') {
            // when {
            //     anyOf {
            //         buildingTag()
            //         triggeredBy cause: 'UserIdCause'
            //     }
            // }
            steps {
                script {
                    def githubURL = 'https://github.com/sharathvutpala/hello_world'
                    sh 'mkdir temp_dir_for_copy'
                    sh 'cp -rf . temp_dir_for_copy'
                    sh 'cd temp_dir_for_copy'
                    sh 'git init'
                    sh "git config user.email 'apple.cr@cr.tii.ae'"
                    sh "git config user.name 'Auto'"
                    sh 'git add . -- :Jenkinsfile'
                    sh "git commit -m 'Copy files'"
                    sh "git remote add origin ${githubURL}"
                    sh "git push -u origin master"
                }
            }
        }
    }
}
