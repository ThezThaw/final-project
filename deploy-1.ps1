
# $scriptFilePath_cloudfront = $PSScriptRoot + "\_cloudformation\1-create-cloudfront-deploy.ps1"
# Start-Job -Name "cloudfront" -ScriptBlock { & $using:scriptFilePath_cloudfront }

# $scriptFilePath_dynamotable = $PSScriptRoot + "\_cloudformation\3-create-dynamodb-table-deploy.ps1"
# Start-Job -Name "dynamodb" -ScriptBlock { & $using:scriptFilePath_dynamotable }

# $scriptFilePath_s3_creation = $PSScriptRoot + "\_cloudformation\2-create-prerequisite-s3-deploy.ps1"
# $s3_creation = Start-Job -Name "s3" -ScriptBlock { & $using:scriptFilePath_s3_creation }
# Wait-Job $s3_creation





# Login
$scriptFilePath_login_build = $PSScriptRoot + "\backend\Login\deploy-login-build.ps1"
Start-Job -Name "login build" -ScriptBlock { & $using:scriptFilePath_login_build }


# Signup
$scriptFilePath_signup_build = $PSScriptRoot + "\backend\Signup\deploy-signup-build.ps1"
Start-Job -Name "signup build" -ScriptBlock { & $using:scriptFilePath_signup_build }


# Update Profile
$scriptFilePath_updateprofile_build = $PSScriptRoot + "\backend\UpdateProfile\deploy-update-profile-build.ps1"
Start-Job -Name "update profile build" -ScriptBlock { & $using:scriptFilePath_updateprofile_build }

# Update Profile Image url
$scriptFilePath_updateimgurl_build = $PSScriptRoot + "\backend\UpdateProfileImageUrl\deploy-update-imgurl-build.ps1"
Start-Job -Name "update imgurl build" -ScriptBlock { & $using:scriptFilePath_updateimgurl_build }





# $scriptFilePath_dynamotable = $PSScriptRoot + "\_cloudformation\3-create-dynamodb-table-deploy.ps1"
# $last_job = Start-Job -Name "dynamodb" -ScriptBlock { & $using:scriptFilePath_dynamotable }
# Wait-Job $last_job