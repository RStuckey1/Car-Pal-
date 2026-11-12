import { useState, type FormEvent } from "react";
import Auth from "../utils/auth";
import { signUp } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { checkLogin } = useAuth();
  const [userData, setUserData] = useState<UserLogin>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await signUp(userData);
      Auth.login(data.token);
      checkLogin();
      console.log("User created successfully");
      navigate('/Landing', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Account</h2>
      <form className='form signup-form' onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="signup-first-name">First name</label>
          <input
            id="signup-first-name"
            className="form-input"
            type="text"
            name="firstName"
            autoComplete="given-name"
            value={userData.firstName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-last-name">Last name</label>
          <input
            id="signup-last-name"
            className="form-input"
            type="text"
            name="lastName"
            autoComplete="family-name"
            value={userData.lastName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-username">New Username</label>
          <input
            id="signup-username"
            className="form-input"
            type="text"
            name="username"
            value={userData.username || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="form-input"
            type="password"
            name="password"
            value={userData.password || ""}
            onChange={handleChange}
            required
            />
         </div>
           <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className="form-input"
            type="email"
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            required
            />
        </div>
        <div className="form-group1">
          {error && <p role="alert">{error}</p>}
          <button className="user-login" type="submit">
           Signup
          </button>
        </div>
      </form>
      <div className="new-login"></div>


    </div>
  
  );
};

export default SignUp;
