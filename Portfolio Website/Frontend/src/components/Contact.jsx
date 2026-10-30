import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import contactService from '../services/contactService';

export default function Contact({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Please provide your email address or phone number.';
    } else if (
      formData.contact.includes('@') &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.trim())
    ) {
      newErrors.contact = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');
    setErrors({});

    try {
      // Send message to Backend via Axios
      const result = await contactService.sendMessage(formData);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B00FF', '#E000FF', '#FFFFFF', '#6366F1'],
        });
      } catch (cErr) {
        // silent
      }

      setSubmitted(true);
      setStatusMessage(
        result?.message ||
          'Thank you! Your message has been sent successfully. I will get back to you shortly.'
      );
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      console.warn('Axios submission error:', error.message);
      // If server is not responding, gracefully notify with helpful prompt
      setErrors({
        form:
          error.message ||
          'An error occurred while communicating with the backend. Please try again or email directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Section Heading matching Screenshot 1 */}
        <div style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '14px',
            }}
          >
            {data?.heading || 'Contact Me'}
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {data?.subtitle || "Got a project waiting to be realized? Let's collaborate and make it happen!"}
          </p>
        </div>

        {/* Feedback Alert */}
        {submitted && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid #10B981',
              color: '#34D399',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <CheckCircle2 size={22} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{statusMessage}</span>
          </div>
        )}

        {errors.form && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid #EF4444',
              color: '#F87171',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <AlertCircle size={22} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{errors.form}</span>
          </div>
        )}

        {/* Form matching Screenshot 1 */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Row: Two Inputs Side by Side */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Your Name * */}
            <div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 20px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--input-text)',
                    fontSize: '1rem',
                    border: errors.name ? '2px solid #EF4444' : '1px solid var(--input-border)',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                />
              </div>
              {errors.name && (
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#EF4444', marginTop: '6px' }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email / Phone * */}
            <div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="contact"
                  placeholder="Email / Phone *"
                  value={formData.contact}
                  onChange={handleChange}
                  className="contact-input"
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 20px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--input-text)',
                    fontSize: '1rem',
                    border: errors.contact ? '2px solid #EF4444' : '1px solid var(--input-border)',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  }}
                />
              </div>
              {errors.contact && (
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#EF4444', marginTop: '6px' }}>
                  {errors.contact}
                </span>
              )}
            </div>
          </div>

          {/* Large Message Area */}
          <div>
            <textarea
              name="message"
              placeholder="Message *"
              rows={8}
              value={formData.message}
              onChange={handleChange}
              className="contact-input"
              style={{
                width: '100%',
                padding: '18px 20px',
                borderRadius: '6px',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--input-text)',
                fontSize: '1rem',
                border: errors.message ? '2px solid #EF4444' : '1px solid var(--input-border)',
                outline: 'none',
                resize: 'vertical',
                minHeight: '180px',
                transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              }}
            />
            {errors.message && (
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#EF4444', marginTop: '6px' }}>
                {errors.message}
              </span>
            )}
          </div>

          {/* Bottom Right SEND Button (Matches Screenshot 1) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="send-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 28px',
                backgroundColor: '#FFFFFF',
                color: '#171717',
                fontWeight: 700,
                fontSize: '0.9rem',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                transition: 'transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>SENDING...</span>
                </>
              ) : (
                <>
                  <span>SEND</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .contact-input::placeholder {
          color: #767676;
        }

        .contact-input:focus {
          border-color: var(--accent-purple) !important;
          box-shadow: 0 0 0 3px rgba(139, 0, 255, 0.25);
        }

        .send-button:hover:not(:disabled) {
          transform: translateY(-2px);
          background-color: #F0F0F5;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
