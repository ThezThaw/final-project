
$scriptFilePath = $PSScriptRoot + "\3-cf-apigateway-deploy.ps1"
Start-Job -Name "deploy imgurl apigw" -ScriptBlock { & $using:scriptFilePath }
