
$scriptFilePath = $PSScriptRoot + "\3-cf-apigateway-deploy.ps1"
Start-Job -Name "deploy profile apigw" -ScriptBlock { & $using:scriptFilePath }
