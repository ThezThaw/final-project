aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-apigw-updateimgurl `
--template-file $PSScriptRoot\3-cf-apigateway.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM