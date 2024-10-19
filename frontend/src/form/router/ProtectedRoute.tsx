import { Navigate } from "react-router-dom";
import { authService } from "../../service/AuthService";

export default function ProtectedRoute({ children }: any){
    
    if(authService.isLoggedIn()){
        return children;
    }else{
        return <Navigate to="/login" />;
    }
}