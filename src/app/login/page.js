"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/component/header";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const router = useRouter(); // Define router object

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleInputBlur = (field) => {
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  const submithandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/auth/login",
        { email, password },
        config
      );
      if (data == 401) {
        setLoading(false);
        setErrors({
          email: "Email or password is incorrect.",
        });
      }
      Cookies.set("token", data.token, { expires: 1 / 1440 }); // Expires in 1 minute
      setLoading(false);
      handleLoginSuccess(data.token); // Pass token instead of data
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while logging in:", error);
      // Display error message to the user
    }
  };

  const handleLoginSuccess = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role === "fundraiser") {
      router.push("/fundraiser"); // Redirect to fundraiser page if role=fundraiser
    } else if (decodedToken.role === "user") {
      router.push("/user"); // Redirect to user page if role=user
    } else {
      router.push("/"); // Redirect to default page if role is neither fundraiser nor user
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      handleLoginSuccess(token);
    }
  }, []);

  return (
    <>
      <body>
        <div className="main">
          <Header />
          <section>
            <div className="left">
              <form>
                <div className="form-img">
                  <img src="images/login-forn.png" alt="form-image" />
                </div>
                <h2>Log In</h2>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <div className="email-inside">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleInputBlur("email")}
                      type="email"
                      value={email}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {touchedFields.email && errors.email && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "6px",
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="psw">
                  <label htmlFor="password">Password</label>
                  <div className="psw-inside">
                    <i className="fa-solid fa-key"></i>
                    <input
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleInputBlur("password")}
                      type="password"
                      value={password}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  {touchedFields.password && errors.password && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginBottom: "6px",
                      }}
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="identification">
                  <div className="remember">
                    <input type="checkbox" name="remember-me" />
                    <label htmlFor="remember me">Remember&nbsp;me</label>
                  </div>
                  <div className="forgot">
                    <p>
                      <a href="Forgot password">Forgot password?</a>
                    </p>
                  </div>
                </div>
                <div className="submit">
                  <button
                    type="submit"
                    onClick={submithandler}
                    className="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
            <div className="right">
              <h1>Empower Fundraising Heroes: Your Appeal Sparks Change!</h1>
              <div className="help-img">
                <img src="images/login-image.png" alt="Help Each Other" />
              </div>
            </div>
          </section>
        </div>
      </body>
    </>
  );
}
