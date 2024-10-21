aws cloudformation deploy ^
--profile cfadmin ^
--stack-name fp-deploy-cloudfront ^
--template-file 3_setup_cf.json ^
--region us-east-1