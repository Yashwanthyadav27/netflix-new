import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    fullName: '',
    profileName: '',
    dateOfBirth: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userData = {
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      fullName: formData.fullName,
      profileName: formData.profileName,
      dateOfBirth: formData.dateOfBirth,
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/browse');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop" 
          alt="Netflix Background" 
        />
        <div className="auth-gradient"></div>
      </div>
      
      <nav className="auth-navbar">
        <h1 className="auth-logo">NETFLIX</h1>
        <Link to="/login" className="auth-signin-btn">Sign In</Link>
      </nav>

      <div className="auth-container">
        <div className="auth-form-container signup-form-container">
          {step === 1 ? (
            <>
              <div className="step-indicator">
                <span>STEP <strong>1</strong> OF <strong>2</strong></span>
              </div>
              <h2>Create a password to start your membership</h2>
              <p className="step-description">
                Just a few more steps and you're done! We hate paperwork, too.
              </p>
              
              {error && <div className="auth-error">{error}</div>}
              
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Add a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="button" className="auth-btn" onClick={handleNext}>
                  Next
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="step-indicator">
                <span>STEP <strong>2</strong> OF <strong>2</strong></span>
              </div>
              <h2>Complete your profile</h2>
              <p className="step-description">
                Tell us a bit more about yourself.
              </p>
              
              {error && <div className="auth-error">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="profileName"
                    placeholder="Profile Name (display name)"
                    value={formData.profileName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="date-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Start Membership'}
                </button>

                <button type="button" className="back-btn" onClick={() => setStep(1)}>
                  Back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
