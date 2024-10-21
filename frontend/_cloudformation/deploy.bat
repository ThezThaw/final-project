@echo off
call 1_deploy_s3.bat

@echo on
echo '### StaticWebsiteBucket, ProfileImageBucket, and CodeBuildBucket have been created...'
@echo off

call 2_deploy_pipeline.bat
@echo on
echo '### Frontend code pipeline has been created...'
@echo off

call 3_deploy_cf.bat
@echo on
echo '### Frontend cloud front has been created...'
echo '### Run backend cloud formation script...'
@echo off