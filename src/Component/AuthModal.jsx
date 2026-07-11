import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";

export default function AuthModal({ isOpen, onClose, onJoinSuccess }) {
  const { register: registerUser, login } = useAuth();
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      reset();
      clearErrors();
      setFormError("");
      setShowPassword(false);
    }
  }, [isOpen, reset, clearErrors]);

  if (!isOpen) return null;

  function switchMode(toLogin) {
    setIsExistingUser(toLogin);
    clearErrors();
    setFormError("");
  }

  function onSubmitData(data) {
    setFormError("");
    try {
      if (isExistingUser) {
        login({ email: data.email.trim(), password: data.password });
      } else {
        registerUser({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          password: data.password,
        });
      }
      onJoinSuccess?.();
      onClose();
    } catch (err) {
      setFormError(err.message);
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
      style={{ backgroundColor: "rgba(30,41,59,0.45)", zIndex: 9999 }}
    >
  
      <style>{`
        .synapse-modal { font-family: 'Plus Jakarta Sans', sans-serif; }
        .synapse-input:focus { border-color: #6D5DF6 !important; box-shadow: 0 0 0 3px rgba(109,93,246,0.15); }
        .synapse-submit:hover { background-color: #5b4bf0 !important; }
        .synapse-pill:hover { background-color: #EAE5FF !important; }
      `}</style>

      <div
        className="synapse-modal position-relative bg-white rounded-4 shadow-lg w-100 p-4 p-md-5"
        style={{ maxWidth: 420 }}
      >

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            type="button"
            onClick={onClose}
            className="btn p-0 border-0 fs-4 lh-1 text-secondary"
          >
            &times;
          </button>

          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted">
              {isExistingUser ? "New to Synapse?" : "Already have an account?"}
            </span>
            <button
              type="button"
              className="synapse-pill btn btn-sm fw-bold rounded-pill px-3"
              style={{ backgroundColor: "#F3F1FF", color: "#6D5DF6" }}
              onClick={() => switchMode(!isExistingUser)}
            >
              {isExistingUser ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </div>


        <h2 className="fw-bold fs-3 mb-1" style={{ color: "#111827" }}>
          {isExistingUser ? "Welcome back!" : "Welcome to Synapse!"}
        </h2>
        <p className="mb-4" style={{ color: "#6B7280" }}>
          {isExistingUser ? "Sign in to your account" : "Create your account to start a room"}
        </p>

        <form onSubmit={handleSubmit(onSubmitData)}>
          {!isExistingUser && (
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label fw-semibold small mb-1" style={{ color: "#111827" }}>First name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="form-control synapse-input rounded-3"
                  {...register("firstName", { required: "Required" })}
                />
                {errors.firstName && (
                  <p className="small text-danger mt-1 mb-0">{errors.firstName.message}</p>
                )}
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold small mb-1" style={{ color: "#111827" }}>Last name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="form-control synapse-input rounded-3"
                  {...register("lastName", { required: "Required" })}
                />
                {errors.lastName && (
                  <p className="small text-danger mt-1 mb-0">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold small mb-1" style={{ color: "#111827" }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="form-control synapse-input rounded-3"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="small text-danger mt-1 mb-0">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold small mb-1" style={{ color: "#111827" }}>Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="8+ characters"
                className="form-control synapse-input rounded-3"
                style={{ paddingInlineEnd: 40 }}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Must be at least 6 characters" },
                })}
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y p-0 border-0 text-secondary me-2"
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18M10.6 10.6a2 2 0 002.83 2.83M9.9 4.24A9.86 9.86 0 0112 4c5 0 9 4 10 8a10.8 10.8 0 01-2.16 3.68M6.6 6.6C4.6 8 3.2 10 2 12c1 4 5 8 10 8 1.5 0 2.9-.3 4.15-.86" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="small text-danger mt-1 mb-0">{errors.password.message}</p>}
          </div>

          {formError && (
            <div className="small text-danger bg-danger-subtle rounded-3 px-3 py-2 mb-3">
              {formError}
            </div>
          )}

          <button
            type="submit"
            className="synapse-submit btn w-100 fw-bold text-white rounded-pill py-2 border-0"
            style={{ backgroundColor: "#6D5DF6" }}
          >
            {isExistingUser ? "Login" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}