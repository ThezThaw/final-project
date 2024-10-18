using Amazon.Lambda.Core;
using System.Text.Json;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Signup;

public class Function
{
    
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
            return new Response()
            {
                status = true,
                message = "OK" + JsonSerializer.Serialize(input)
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
