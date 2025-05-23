import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email before submission
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      // Here you would implement the actual password reset API call
      console.log("Password reset requested for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isSubmitted ? (
          <div className="auth-success">
            <div className="auth-success-icon">✓</div>
            <h2>Check Your Email</h2>
            <p>
              We've sent password reset instructions to:
              <br />
              <strong>{email}</strong>
            </p>
            <p className="auth-success-note">
              If you don't see the email in your inbox, please check your spam
              folder.
            </p>
            <div className="auth-actions">
              <Link to="/login" className="auth-button">
                Return to Login
              </Link>
              <button
                className="auth-button-secondary"
                onClick={() => setIsSubmitted(false)}
              >
                Try Another Email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <h2>Forgot Password</h2>
              <p>Enter your email to reset your password</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  required
                  placeholder="Enter your registered email"
                  className={emailError ? "input-error" : ""}
                />
                {emailError && <div className="field-error">{emailError}</div>}
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="button-with-loader">
                    <span className="loader-spinner"></span>
                    Sending...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Remembered your password?{" "}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
