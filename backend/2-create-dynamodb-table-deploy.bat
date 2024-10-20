aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-dynamodb-table ^
--template-file 2-create-dynamodb-table.json ^
--region us-east-1 ^
--capabilities CAPABILITY_IAM