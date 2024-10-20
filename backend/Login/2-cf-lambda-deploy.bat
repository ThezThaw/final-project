aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-lambda-login ^
--template-file 2-cf-lambda.json ^
--region us-east-1 ^
--capabilities CAPABILITY_IAM