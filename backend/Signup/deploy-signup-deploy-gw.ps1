$scriptFilePath = $PSScriptRoot + "\3-cf-apigateway-deploy.ps1"
Start-Job -Name "deploy signup apigw" -ScriptBlock { & $using:scriptFilePath }