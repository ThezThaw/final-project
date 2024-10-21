
$scriptFilePath = $PSScriptRoot + "\2-cf-lambda-deploy.ps1"
Start-Job -Name "deploy login func" -ScriptBlock { & $using:scriptFilePath }