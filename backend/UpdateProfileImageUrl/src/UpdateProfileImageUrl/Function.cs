using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.Core;
using Helper;
using System.Net;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace UpdateProfileImageUrl;

public class Function
{
    private readonly IAmazonDynamoDB dynamoDbClient;
    public Function()
    { 
        HelperClass.LoadEnvVariables();
        this.dynamoDbClient = new AmazonDynamoDBClient();
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
                TableName = HelperClass.userTblName,
                Key = new Dictionary<string, AttributeValue>
                {
                    { "email", new AttributeValue { S = input.email }  }
                }
            };

            var user = await dynamoDbClient.GetItemAsync(dbGetRequest);
            if (!user.Item.Any())
            {
                throw new ApplicationException($"User not found");
            }

            var dbPutRequest = new PutItemRequest()
            {
                TableName = HelperClass.userTblName,
                Item = new Dictionary<string, AttributeValue>
                {
                    { "email", new AttributeValue { S = input.email } },
                    { "password", new AttributeValue { S = user.Item["password"].S } },
                    { "name", new AttributeValue { S = user.Item["name"].S } },
                    { "profileImage", new AttributeValue { S = $"https://{HelperClass.profileImageS3BucketName}.s3.amazonaws.com/{input.email}" } }
                }
            };

            var dbPutResult = await dynamoDbClient.PutItemAsync(dbPutRequest);
            if (dbPutResult.HttpStatusCode != HttpStatusCode.OK)
            {
                throw new Exception("Fail to insert record into database.");
            }

            return new Response()
            {
                status = true,
                message = "OK"
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
