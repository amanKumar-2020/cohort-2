import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import "./register.theme.css";
import "./Register.css";

/* ── Inline SVG icons (no external deps) ── */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Register() {
  const { handleRegister } = useAuth();

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
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        {/* ── Header ── */}
        <header className="register-header">
          <span className="register-header__label">Get started</span>
          <h1 className="register-header__title">Create Account</h1>
          <p className="register-header__subtitle">Join the curated collection</p>
        </header>

        {/* ── Error banner ── */}
        {error && <div className="register-error" role="alert">{error}</div>}

        {/* ── Form ── */}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-fullname">
              Full Name
            </label>
            <div className="input-group__wrapper">
              <input
                id="register-fullname"
                className="input-group__field"
                type="text"
                name="fullName"
                placeholder="John Doe"
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
              Email
            </label>
            <div className="input-group__wrapper">
              <input
                id="register-email"
                className="input-group__field"
                type="email"
                name="email"
                placeholder="you@example.com"
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
              <input
                id="register-contact"
                className="input-group__field"
                type="tel"
                name="contact"
                placeholder="+91 98765 43210"
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
              Password
            </label>
            <div className="input-group__wrapper">
              <input
                id="register-password"
                className="input-group__field"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
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
            <span className="checkbox-group__label">
              Register as a <strong>Seller</strong>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
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
