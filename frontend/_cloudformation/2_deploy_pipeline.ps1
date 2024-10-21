aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-frontend-pipeline `
--template-file $PSScriptRoot\2_setup_pipeline.json `
--region us-east-1 `
--capabilities CAPABILITY_IAM