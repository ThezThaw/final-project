aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-s3-bucket ^
--template-file 1_setup_create_s3.json ^
--region us-east-1