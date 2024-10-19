namespace UpdateProfile
{ 
    public class Request
    {
        public string email { get; set; }
        public string name { get; set; }
        public string? password { get; set; }
        public string? newPassword { get; set; }
        public bool passwordChanged
        {
            get
            {
                return newPassword is not null;
            }
        }
        public bool imgChanged { get; set; }
        public string? profileImageType { get; set; }
    }
}
