aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-lambda-login `
--template-file $PSScriptRoot\2-cf-lambda.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM