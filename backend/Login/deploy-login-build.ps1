# Login Lambda
$scriptFilePath_lambda_login = $PSScriptRoot + "\1-cf-codebuild-deploy.ps1"
$last_job = Start-Job -Name "login build" -ScriptBlock { & $using:scriptFilePath_lambda_login }
Wait-Job $last_job