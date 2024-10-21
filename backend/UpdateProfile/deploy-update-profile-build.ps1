$scriptFilePath_lambda_update_profile = $PSScriptRoot + "\1-cf-codebuild-deploy.ps1"
$last_job = Start-Job -Name "update profile build" -ScriptBlock { & $using:scriptFilePath_lambda_update_profile }
Wait-Job $last_job