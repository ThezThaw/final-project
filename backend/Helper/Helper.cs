namespace Helper
{
    public static class HelperClass
    {
        public static void LoadEnvVariables()
        {
            userTblName = Environment.GetEnvironmentVariable("userTblName");
            profileImageS3BucketName = Environment.GetEnvironmentVariable("profileImageS3BucketName");
        }

        public static string userTblName { get; set; }
        public static string profileImageS3BucketName { get; set; }
    }
}
