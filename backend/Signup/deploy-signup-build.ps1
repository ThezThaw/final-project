$scriptFilePath_lambda_signup = $PSScriptRoot + "\1-cf-codebuild-deploy.ps1"
$last_job = Start-Job -Name "signup build" -ScriptBlock { & $using:scriptFilePath_lambda_signup }
Wait-Job $last_job