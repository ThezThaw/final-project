$scriptFilePath = $PSScriptRoot + "\3-cf-apigateway-deploy.ps1"
$checkpoint_job = Start-Job -Name "deploy login apigw" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job