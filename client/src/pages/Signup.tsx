import { useState, type FormEvent } from "react";
import Auth from "../utils/auth";
import { signUp } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserLogin>({
    username: "",
    email: "",
    password: "",
  });
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
    try {
      const data = await signUp(userData);
      Auth.login(data.token);
      console.log("User created successfully");
      navigate('/login');
    } catch (err) {
      console.error("Failed to create user", err);
    }
  };

  return (
    <div className="form-container signup-container">
      <form className= 'form signup-form' onSubmit={handleSubmit}>
        <h2>Create a New Account</h2>
        <div className="form-group">
          <FloatingLabel
            controlId="floatingName"
            label="username"
            className="mb-3"
          >
            <Form.Control
              name="username"
              placeholder="John Doe"
              value={userData.username ?? ''}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </div>
        <div className="form-group">
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              value={userData.email ?? ''}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </div>
        <div className="form-group">
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password ?? ''}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </div>
        <div className="form-group">
            <Button
            variant="primary"
            type="submit"
            className="form signup-form"
            onClick={handleSubmit}
            >
            Create Account
            </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
