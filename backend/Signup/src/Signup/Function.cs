using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.Core;
using Amazon.S3;
using System.Net;
using System.Text.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Signup;

public class Function
{
    private const string userTblName = "user";
    private const string profileImageS3BucketName = "profile-image-cs516";

    private readonly IAmazonDynamoDB dynamoDbClient;
    private readonly IAmazonS3 s3Client;
    public Function()
    {
        this.dynamoDbClient = new AmazonDynamoDBClient();
        this.s3Client = new AmazonS3Client();
    }



    /// <summary>
    /// A simple function that takes a string and does a ToUpper
    /// </summary>
    /// <param name="input">The event for the Lambda function handler to process.</param>
    /// <param name="context">The ILambdaContext that provides methods for logging and describing the Lambda environment.</param>
    /// <returns></returns>
    public async Task<Response> FunctionHandler(Request input, ILambdaContext context)
    {
        try
        {
            var dbGetRequest = new GetItemRequest()
            {
                TableName = userTblName,
                Key = new Dictionary<string, AttributeValue>
                {
                    { "email", new AttributeValue { S = input.email }  }
                }
            };

            var existing = await dynamoDbClient.GetItemAsync(dbGetRequest);
            if (existing.Item.Any())
            {
                throw new ApplicationException($"{input.email} already exists.");
            }


            var dbPutRequest = new PutItemRequest()
            {
                TableName = userTblName,
                Item = new Dictionary<string, AttributeValue>
                {
                    { "email", new AttributeValue { S = input.email } },
                    { "password", new AttributeValue { S = BCrypt.Net.BCrypt.HashPassword(input.password) } },
                    { "name", new AttributeValue { S = input.name } },
                    { "profileImage", new AttributeValue { S = $"https://{profileImageS3BucketName}.s3.amazonaws.com/{input.email}" } }
                }
            };

            var dbPutResult = await dynamoDbClient.PutItemAsync(dbPutRequest);
            if (dbPutResult.HttpStatusCode != HttpStatusCode.OK)
            {
                throw new Exception("Fail to insert record into database.");
            }

            var s3PreSignedUrl = s3Client.GetPreSignedURL(new Amazon.S3.Model.GetPreSignedUrlRequest()
            {
                BucketName = profileImageS3BucketName,
                Key = input.email,
                Expires = DateTime.UtcNow.AddSeconds(60)
            });


            return new Response()
            {
                status = true,
                message = "OK",
                s3PreSignedUrl = s3PreSignedUrl
            };
        }
        catch (ApplicationException ex)
        {
            return new Response()
            {
                status = false,
                message = ex.Message
            };
        }
        catch (Exception ex)
        {
            return new Response()
            {
                status = false,
                message = ex.ToString()
            };
        }
    }
}
