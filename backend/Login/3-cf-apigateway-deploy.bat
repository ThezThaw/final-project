aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-apigw-login ^
--template-file 3-cf-apigateway.json ^
--region us-east-1 ^
--capabilities CAPABILITY_IAM