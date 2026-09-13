import React, { useState } from 'react';

// --- TYPES ---
export interface SurveyQuestion {
  id: string;
  title: string;
  description: string;
  options: { label: string; value: number }[];
}

// --- MOCK QUESTION DATA (Non-sensitive Physical Health Module) ---
const MOCK_QUESTION: SurveyQuestion = {
  id: 'joint_muscle_pain',
  title: 'Joint & Muscle Discomfort',
  description: 'How severely have you experienced joint pain, stiffness, or muscle discomfort over the past week?',
  options: [
    { label: 'None (0)', value: 0 },
    { label: 'Mild (1)', value: 1 },
    { label: 'Moderate (2)', value: 2 },
    { label: 'Severe (3)', value: 3 },
    { label: 'Very Severe (4)', value: 4 },
  ],
};

// --- MOCK API SUBMIT FUNCTION ---
const submitAssessment = async (payload: { questionId: string; rating: number }): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.rating !== undefined) {
        resolve({ success: true });
      } else {
        reject(new Error('Invalid selection'));
      }
    }, 700);
  });
};

export default function App() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (selectedRating === null) return;
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      await submitAssessment({
        questionId: MOCK_QUESTION.id,
        rating: selectedRating,
      });
      setStatusMessage('Assessment submitted successfully!');
    } catch (err) {
      setStatusMessage('Error submitting assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mobileCard}>
        <div style={styles.header}>
          <span style={styles.stepTag}>Step 1 of 3</span>
          <h2 style={styles.title}>{MOCK_QUESTION.title}</h2>
          <p style={styles.description}>{MOCK_QUESTION.description}</p>
        </div>

        {/* Options List */}
        <div style={styles.optionsList}>
          {MOCK_QUESTION.options.map((option) => {
            const isSelected = selectedRating === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedRating(option.value)}
                style={{
                  ...styles.optionButton,
                  ...(isSelected ? styles.selectedOption : {}),
                }}
              >
                <span style={styles.optionText}>{option.label}</span>
                <span
                  style={{
                    ...styles.radioIndicator,
                    ...(isSelected ? styles.selectedRadio : {}),
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedRating === null || isSubmitting}
          style={{
            ...styles.submitButton,
            ...(selectedRating === null || isSubmitting ? styles.disabledButton : {}),
          }}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>

        {statusMessage && <p style={styles.statusText}>{statusMessage}</p>}
      </div>
    </div>
  );
}

// --- STYLES (Clean longhand borders to prevent React warnings) ---
const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#eef2f6',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  mobileCard: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  stepTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    margin: 0,
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.4',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  optionButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '52px',
    padding: '12px 16px',
    borderRadius: '12px',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    textAlign: 'left',
  },
  selectedOption: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1f2937',
  },
  radioIndicator: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#d1d5db',
  },
  selectedRadio: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  submitButton: {
    minHeight: '48px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  statusText: {
    margin: 0,
    textAlign: 'center',
    fontSize: '14px',
    color: '#059669',
    fontWeight: '500',
  },
};
