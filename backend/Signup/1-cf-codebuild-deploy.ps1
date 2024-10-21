
aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-codebuild-signup `
--template-file $PSScriptRoot\1-cf-codebuild.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM