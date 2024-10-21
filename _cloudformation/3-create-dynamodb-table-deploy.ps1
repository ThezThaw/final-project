
aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-dynamodb-table `
--template-file $PSScriptRoot\3-create-dynamodb-table.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM

Write-Host 'DynamoDB table has been created'