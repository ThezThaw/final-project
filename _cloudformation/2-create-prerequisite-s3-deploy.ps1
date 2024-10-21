aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-s3-bucket `
--template-file $PSScriptRoot\2-create-prerequisite-s3.json `
--region us-east-1

Write-Host 'Prerequisite s3 bucket has been created'