﻿namespace Login
{
    public class Response
    {
        public bool status { get; set; }
        public string message { get; set; }
        public AppUserVm loggedInUserInfo { get; set; }
    }
}