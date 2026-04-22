import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import "./register.theme.css";
import "./Login.css";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

/* ── Inline SVG icons (no external deps) ── */
const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await handleLogin(form);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
        navigate("/");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ── Header ── */}
        <header className="login-header">
          <span className="login-header__label">Welcome Back</span>
          <h1 className="login-header__title">Sign In</h1>
          <p className="login-header__subtitle">
            Enter your credentials to access your account
          </p>
        </header>

        {/* ── Error banner ── */}
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        {/* ── Form ── */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="input-group full-width">
            <label className="input-group__label" htmlFor="login-email">
              Email Address
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>
              <input
                id="login-email"
                className="input-group__field has-icon"
                type="email"
                name="email"
                placeholder="jane.doe@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group full-width">
            <label className="input-group__label" htmlFor="login-password">
              Password
            </label>
            <div className="input-group__wrapper input-icon">
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <input
                id="login-password"
                className="input-group__field has-icon"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="input-group__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn full-width"
            disabled={loading}
          >
            {loading && <span className="login-btn__spinner" />}
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>
        <ContinueWithGoogle />

        {/* ── Footer ── */}
        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/register" className="login-footer__link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
