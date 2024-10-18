namespace Signup
{
    public class Response
    {
        public bool status { get; set; }
        public string message { get; set; }
        public string s3PreSignedUrl { get; set; }
    }
}
