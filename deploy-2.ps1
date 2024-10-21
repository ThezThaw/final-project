
# Login
$scriptFilePath_login_deploy = $PSScriptRoot + "\backend\Login\deploy-login-deploy.ps1"
Start-Job -Name "deploy login func" -ScriptBlock { & $using:scriptFilePath_login_deploy }

# Signup
$scriptFilePath_signup_deploy = $PSScriptRoot + "\backend\Signup\deploy-signup-deploy.ps1"
Start-Job -Name "deploy signup func" -ScriptBlock { & $using:scriptFilePath_signup_deploy }

# Update Profile
$scriptFilePath_updateprofile_deploy = $PSScriptRoot + "\backend\UpdateProfile\deploy-update-profile-deploy.ps1"
Start-Job -Name "deploy profile func" -ScriptBlock { & $using:scriptFilePath_updateprofile_deploy }

# Update Profile Image url
$scriptFilePath_updateimgurl_deploy = $PSScriptRoot + "\backend\UpdateProfileImageUrl\deploy-update-imgurl-deploy.ps1"
$last_job = Start-Job -Name "deploy imgurl func" -ScriptBlock { & $using:scriptFilePath_updateimgurl_deploy }
Wait-Job $last_job




# $scriptFilePath_dynamotable = $PSScriptRoot + "\_cloudformation\3-create-dynamodb-table-deploy.ps1"
# $last_job = Start-Job -Name "dynamodb" -ScriptBlock { & $using:scriptFilePath_dynamotable }
# Wait-Job $last_job