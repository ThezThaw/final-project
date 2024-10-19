using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.Core;
using Amazon.S3;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Login;

public class Function
{
    private const string userTblName = "user";

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

            

            var loginUser = await dynamoDbClient.GetItemAsync(dbGetRequest);
            if (!loginUser.Item.Any())
            {
                throw new ApplicationException($"Invalid email or password.");
            }

            if (!BCrypt.Net.BCrypt.Verify(input.password, loginUser.Item["password"].S))
            {
                throw new ApplicationException($"Invalid email or password.");
            }

            return new Response()
            {
                status = true,
                message = "OK",
                loggedInUserInfo = new AppUserVm()
                { 
                    name = loginUser.Item["name"].S,
                    email = loginUser.Item["email"].S,
                    img = loginUser.Item["profileImage"].S
                }
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
