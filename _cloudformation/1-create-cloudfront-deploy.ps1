
aws cloudformation deploy `
--profile cfadmin `
--stack-name fp-deploy-cloudfront `
--template-file $PSScriptRoot\1-create-cloudfront.json `
--region us-east-1

Write-Host 'CloudFront has been created'