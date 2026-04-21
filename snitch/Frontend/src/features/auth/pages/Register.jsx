import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import "./register.theme.css";
import "./Register.css";

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

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function Register() {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await handleRegister(form);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
      navigate("/");
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        {/* ── Header ── */}
        <header className="register-header">
          <span className="register-header__label">Get started</span>
          <h1 className="register-header__title">Create Account</h1>
          <p className="register-header__subtitle">
            Join the curated collection
          </p>
        </header>

        {/* ── Error banner ── */}
        {error && (
          <div className="register-error" role="alert">
            {error}
          </div>
        )}

        {/* ── Form ── */}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-fullname">
              Full Name
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <UserIcon />
              </span>
              <input
                id="register-fullname"
                className="input-group__field has-icon"
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-email">
              Email Address
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>
              <input
                id="register-email"
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

          {/* Contact Number */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-contact">
              Contact Number
            </label>
            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <PhoneIcon />
              </span>
              <input
                id="register-contact"
                className="input-group__field has-icon"
                type="tel"
                name="contact"
                placeholder="+1 (555) 123-4567"
                value={form.contact}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-password">
              Create Password
            </label>
            <div className="input-group__wrapper input-icon">
              <span className="input-group__icon">
                <LockIcon />
              </span>
              <input
                id="register-password"
                className="input-group__field has-icon"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
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

          {/* isSeller checkbox */}
          <div className="checkbox-container full-width">
            <label className="checkbox-group" htmlFor="register-isseller">
              <input
                id="register-isseller"
                className="checkbox-group__input"
                type="checkbox"
                name="isSeller"
                checked={form.isSeller}
                onChange={handleChange}
              />
              <span className="checkbox-group__box">
                <CheckIcon />
              </span>
              <div className="checkbox-group__content">
                <span className="checkbox-group__label">
                  Register as a <strong>SELLER</strong>
                </span>
                <span className="checkbox-group__desc">
                  Enable your profile for selling.
                </span>
              </div>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading && <span className="register-btn__spinner" />}
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        {/* ── Footer ── */}
        <p className="register-footer">
          Already have an account?{" "}
          <a href="/login" className="register-footer__link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
