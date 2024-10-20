aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-s3-codebuild-bucket ^
--template-file 1-create-codebuild-s3-bucket.json ^
--region us-east-1 ^
--capabilities CAPABILITY_IAM