
$scriptFilePath_cloudfront = $PSScriptRoot + "\_cloudformation\1-create-cloudfront-deploy.ps1"
Start-Job -Name "cloudfront" -ScriptBlock { & $using:scriptFilePath_cloudfront }


$scriptFilePath_s3_creation = $PSScriptRoot + "\_cloudformation\2-create-prerequisite-s3-deploy.ps1"
$s3_creation = Start-Job -Name "s3" -ScriptBlock { & $using:scriptFilePath_s3_creation }
Wait-Job $s3_creation






$scriptFilePath_dynamotable = $PSScriptRoot + "\_cloudformation\3-create-dynamodb-table-deploy.ps1"
$last_job = Start-Job -Name "dynamodb" -ScriptBlock { & $using:scriptFilePath_dynamotable }
Wait-Job $last_job