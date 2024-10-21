
$scriptFilePath = $PSScriptRoot + "\2-cf-lambda-deploy.ps1"
$last_job = Start-Job -Name "deploy signup func" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $last_job


$scriptFilePath = $PSScriptRoot + "\3-cf-apigateway-deploy.ps1"
$last_job = Start-Job -Name "deploy signup apigw" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $last_job