
$scriptFilePath = $PSScriptRoot + "\2-cf-lambda-deploy.ps1"
$checkpoint_job = Start-Job -Name "deploy profile func" -ScriptBlock { & $using:scriptFilePath }
Wait-Job $checkpoint_job
