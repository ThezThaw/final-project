Write-Host 'Lambda login code building...'

aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-codebuild-login `
--template-file $PSScriptRoot\1-cf-codebuild.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM

Write-Host 'Lambda login code has been built'