// Form Validation and Handling

// Astrologer Registration Form
const astrologerForm = document.getElementById('astrologerForm');
if (astrologerForm) {
    astrologerForm.addEventListener('submit', handleAstrologerSubmit);
    astrologerForm.addEventListener('reset', () => {
        clearAllErrors();
        document.getElementById('successMessage').style.display = 'none';
    });
}

// Inquiry Form
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', handleInquirySubmit);
    inquiryForm.addEventListener('reset', () => {
        clearAllErrors();
        document.getElementById('inquirySuccessMessage').style.display = 'none';
    });
}

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    feedbackForm.addEventListener('reset', () => {
        clearAllErrors();
        document.getElementById('feedbackSuccessMessage').style.display = 'none';
        document.getElementById('charCount').textContent = '0';
    });

    // Character counter for feedback message
    const feedbackMessage = document.getElementById('feedbackMessage');
    if (feedbackMessage) {
        feedbackMessage.addEventListener('input', () => {
            const count = feedbackMessage.value.length;
            document.getElementById('charCount').textContent = count;
            if (count > 1000) {
                feedbackMessage.value = feedbackMessage.value.substring(0, 1000);
                document.getElementById('charCount').textContent = 1000;
            }
        });
    }
}

// Handle Astrologer Form Submission
function handleAstrologerSubmit(e) {
    e.preventDefault();
    clearAllErrors();

    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        specialization: document.getElementById('specialization').value,
        experience: document.getElementById('experience').value,
        qualifications: document.getElementById('qualifications').value.trim(),
        consultationModes: getCheckedValues('consultationModes'),
        languages: getCheckedValues('languages'),
        website: document.getElementById('website').value.trim(),
        additionalInfo: document.getElementById('additionalInfo').value.trim(),
        agree: document.getElementById('agree').checked
    };

    if (validateAstrologerForm(formData)) {
        submitFormData('Astrologer Registration', formData);
        showSuccessMessage('successMessage');
        astrologerForm.reset();
    }
}

// Handle Inquiry Form Submission
function handleInquirySubmit(e) {
    e.preventDefault();
    clearAllErrors();

    const formData = {
        name: document.getElementById('inquiryName').value.trim(),
        email: document.getElementById('inquiryEmail').value.trim(),
        phone: document.getElementById('inquiryPhone').value.trim(),
        subject: document.getElementById('inquirySubject').value,
        message: document.getElementById('inquiryMessage').value.trim(),
        contactBack: document.getElementById('contactBack').checked
    };

    if (validateInquiryForm(formData)) {
        submitFormData('General Inquiry', formData);
        showSuccessMessage('inquirySuccessMessage');
        inquiryForm.reset();
    }
}

// Handle Feedback Form Submission
function handleFeedbackSubmit(e) {
    e.preventDefault();
    clearAllErrors();

    const formData = {
        name: document.getElementById('feedbackName').value.trim(),
        email: document.getElementById('feedbackEmail').value.trim(),
        type: document.getElementById('feedbackType').value,
        rating: document.querySelector('input[name="feedbackRating"]:checked')?.value || '',
        message: document.getElementById('feedbackMessage').value.trim(),
        followUp: document.getElementById('followUp').checked
    };

    if (validateFeedbackForm(formData)) {
        submitFormData('Feedback', formData);
        showSuccessMessage('feedbackSuccessMessage');
        feedbackForm.reset();
        document.getElementById('charCount').textContent = '0';
    }
}

// Validation Functions
function validateAstrologerForm(data) {
    let isValid = true;

    // Validate Full Name
    if (!data.fullName) {
        showError('fullName', 'Full name is required');
        isValid = false;
    } else if (data.fullName.length < 3) {
        showError('fullName', 'Full name must be at least 3 characters');
        isValid = false;
    }

    // Validate Age
    if (!data.age) {
        showError('age', 'Age is required');
        isValid = false;
    } else if (data.age < 18 || data.age > 120) {
        showError('age', 'Age must be between 18 and 120');
        isValid = false;
    }

    // Validate Gender
    if (!data.gender) {
        showError('gender', 'Please select a gender');
        isValid = false;
    }

    // Validate Email
    if (!data.email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    if (!data.phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(data.phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate Specialization
    if (!data.specialization) {
        showError('specialization', 'Please select a specialization');
        isValid = false;
    }

    // Validate Experience
    if (!data.experience) {
        showError('experience', 'Years of experience is required');
        isValid = false;
    } else if (data.experience < 0 || data.experience > 70) {
        showError('experience', 'Please enter a valid number of years');
        isValid = false;
    }

    // Validate Consultation Modes
    if (data.consultationModes.length === 0) {
        showError('consultationModes', 'Please select at least one consultation mode');
        isValid = false;
    }

    // Validate Languages
    if (data.languages.length === 0) {
        showError('languages', 'Please select at least one language');
        isValid = false;
    }

    // Validate Agreement
    if (!data.agree) {
        showError('agree', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function validateInquiryForm(data) {
    let isValid = true;

    if (!data.name) {
        showError('inquiryName', 'Name is required');
        isValid = false;
    } else if (data.name.length < 2) {
        showError('inquiryName', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!data.email) {
        showError('inquiryEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('inquiryEmail', 'Please enter a valid email address');
        isValid = false;
    }

    if (data.phone && !isValidPhone(data.phone)) {
        showError('inquiryPhone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (!data.subject) {
        showError('inquirySubject', 'Please select a subject');
        isValid = false;
    }

    if (!data.message) {
        showError('inquiryMessage', 'Message is required');
        isValid = false;
    } else if (data.message.length < 10) {
        showError('inquiryMessage', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function validateFeedbackForm(data) {
    let isValid = true;

    if (!data.name) {
        showError('feedbackName', 'Name is required');
        isValid = false;
    } else if (data.name.length < 2) {
        showError('feedbackName', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!data.email) {
        showError('feedbackEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('feedbackEmail', 'Please enter a valid email address');
        isValid = false;
    }

    if (!data.type) {
        showError('feedbackType', 'Please select feedback type');
        isValid = false;
    }

    if (!data.message) {
        showError('feedbackMessage', 'Feedback message is required');
        isValid = false;
    } else if (data.message.length < 10) {
        showError('feedbackMessage', 'Feedback must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            field.style.borderColor = '#e74c3c';
        }
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(error => {
        error.textContent = '';
    });

    const inputFields = document.querySelectorAll('input, select, textarea');
    inputFields.forEach(field => {
        field.style.borderColor = '';
    });
}

function showSuccessMessage(messageId) {
    const successMessage = document.getElementById(messageId);
    if (successMessage) {
        successMessage.style.display = 'block';
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function submitFormData(formType, data) {
    // In a real application, this would send data to a server
    console.log(`${formType} Form Submitted:`, data);
    console.log(`Timestamp: ${new Date().toISOString()}`);

    // Simulate form submission
    const submissionData = {
        type: formType,
        data: data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };

    // Store in localStorage for demonstration
    let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submissionData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Log to console
    console.log('Form data stored successfully');
    console.table(data);
}

// Real-time Validation
document.addEventListener('DOMContentLoaded', () => {
    // Add real-time validation to email fields
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value && !isValidEmail(field.value)) {
                showError(field.id, 'Please enter a valid email address');
            } else {
                clearFieldError(field.id);
            }
        });
    });

    // Add real-time validation to phone fields
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value && !isValidPhone(field.value)) {
                showError(field.id, 'Please enter a valid phone number');
            } else {
                clearFieldError(field.id);
            }
        });
    });

    // Add real-time validation to text fields
    const textFields = document.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value.length === 0 && field.required) {
                showError(field.id, 'This field is required');
            } else if (field.id === 'fullName' && field.value.length < 3) {
                showError(field.id, 'Name must be at least 3 characters');
            } else {
                clearFieldError(field.id);
            }
        });
    });

    // Add real-time validation to number fields
    const numberFields = document.querySelectorAll('input[type="number"]');
    numberFields.forEach(field => {
        field.addEventListener('blur', () => {
            const value = field.value;
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');

            if (value === '' && field.required) {
                showError(field.id, 'This field is required');
            } else if ((min && value < min) || (max && value > max)) {
                showError(field.id, `Value must be between ${min} and ${max}`);
            } else {
                clearFieldError(field.id);
            }
        });
    });

    // Add real-time validation to textarea fields
    const textareaFields = document.querySelectorAll('textarea');
    textareaFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value.length === 0 && field.required) {
                showError(field.id, 'This field is required');
            } else if (field.value.length < 10 && field.value.length > 0) {
                showError(field.id, 'Message must be at least 10 characters');
            } else {
                clearFieldError(field.id);
            }
        });
    });
});

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            field.style.borderColor = '';
        }
    }
}

// Export form data (for admin dashboard use)
function exportFormData() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `form-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Clear all stored data (admin function)
function clearAllStoredData() {
    if (confirm('Are you sure you want to clear all stored form data? This action cannot be undone.')) {
        localStorage.removeItem('formSubmissions');
        console.log('All stored form data has been cleared');
    }
}
