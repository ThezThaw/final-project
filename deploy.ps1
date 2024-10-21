
$scriptFilePath = $PSScriptRoot + "\_cloudformation\1-create-cloudfront-deploy.ps1"
Start-Job -Name "cloudfront" -ScriptBlock { & $using:scriptFilePath }

$scriptFilePath = $PSScriptRoot + "\_cloudformation\3-create-dynamodb-table-deploy.ps1"
Start-Job -Name "dynamodb" -ScriptBlock { & $using:scriptFilePath }

$scriptFilePath = $PSScriptRoot + "\_cloudformation\2-create-prerequisite-s3-deploy.ps1"
$s3_creation = Start-Job -Name "s3" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $s3_creation


#######################################################################################


# Login
$scriptFilePath = $PSScriptRoot + "\backend\Login\deploy-login-build.ps1"
Start-Job -Name "login build" -ScriptBlock { & $using:scriptFilePath }


# Signup
$scriptFilePath = $PSScriptRoot + "\backend\Signup\deploy-signup-build.ps1"
Start-Job -Name "signup build" -ScriptBlock { & $using:scriptFilePath }


# Update Profile
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfile\deploy-update-profile-build.ps1"
Start-Job -Name "profile build" -ScriptBlock { & $using:scriptFilePath }

# Update Profile Image url
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfileImageUrl\deploy-update-imgurl-build.ps1"
$checkpoint_job = Start-Job -Name "imgurl build" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job


Write-Host 'Check lambda code build before proceed deploy. Make sure all build are completed'  -ForegroundColor Red -BackgroundColor Black
pause




#######################################################################################



# Login
$scriptFilePath = $PSScriptRoot + "\backend\Login\deploy-login-deploy.ps1"
Start-Job -Name "deploy login func" -ScriptBlock { & $using:scriptFilePath }

# Signup
$scriptFilePath = $PSScriptRoot + "\backend\Signup\deploy-signup-deploy.ps1"
Start-Job -Name "deploy signup func" -ScriptBlock { & $using:scriptFilePath }

# Update Profile
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfile\deploy-update-profile-deploy.ps1"
Start-Job -Name "deploy profile func" -ScriptBlock { & $using:scriptFilePath }

# Update Profile Image url
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfileImageUrl\deploy-update-imgurl-deploy.ps1"
$checkpoint_job = Start-Job -Name "deploy imgurl func" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job


Write-Host 'Check lambda functions are deployed before proceed API Gateway. Make sure all functions are available'  -ForegroundColor Red -BackgroundColor Black
pause



#######################################################################################



# Login
$scriptFilePath = $PSScriptRoot + "\backend\Login\deploy-login-deploy-gw.ps1"
Start-Job -Name "deploy login func" -ScriptBlock { & $using:scriptFilePath }

# Signup
$scriptFilePath = $PSScriptRoot + "\backend\Signup\deploy-signup-deploy-gw.ps1"
Start-Job -Name "deploy signup func" -ScriptBlock { & $using:scriptFilePath }

# Update Profile
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfile\deploy-update-profile-deploy-gw.ps1"
Start-Job -Name "deploy profile func" -ScriptBlock { & $using:scriptFilePath }

# Update Profile Image url
$scriptFilePath = $PSScriptRoot + "\backend\UpdateProfileImageUrl\deploy-update-imgurl-deploy-gw.ps1"
$checkpoint_job = Start-Job -Name "deploy imgurl func" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job



Write-Host 'Check API gateway are deployed before proceed UI. Then copy api gateway url into frontend code and commit. Then only proceed deploy UI.'  -ForegroundColor Red -BackgroundColor Black
pause



#######################################################################################


Write-Host 'Deploying UI ...'  -ForegroundColor Green -BackgroundColor Black

$scriptFilePath = $PSScriptRoot + "\frontend\_cloudformation\2_deploy_pipeline.ps1"
$checkpoint_job = Start-Job -Name "deploy ui" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job


Write-Host 'UI Deployed. Check code build'  -ForegroundColor Green -BackgroundColor Black