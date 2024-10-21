
$scriptFilePath = $PSScriptRoot + "\2-cf-lambda-deploy.ps1"
Start-Job -Name "deploy profile func" -ScriptBlock { & $using:scriptFilePath }
