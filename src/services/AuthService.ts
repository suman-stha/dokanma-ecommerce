import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  token: string;
}

class AuthService {
  login(data: LoginData): Promise<UserData> {
    return axios.post(API_URL + "signin", data).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  register(data: SignupData): Promise<any> {
    return axios.post(API_URL + "signup", data);
  }

  forgotPassword(email: string): Promise<any> {
    return axios.post(API_URL + "forgot-password", { email });
  }

  resetPassword(data: ResetPasswordData): Promise<any> {
    return axios.post(API_URL + "reset-password", data);
  }

  getCurrentUser(): UserData | null {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getAuthHeader(): { Authorization: string } | {} {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    }
    return {};
  }
}

export default new AuthService();
