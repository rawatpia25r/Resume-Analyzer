import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

// Interceptor to handle expired tokens (auto-logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || '';
      // Only auto-logout for token-related errors, not login failures
      if (message.includes('expired') || message.includes('Not authorized')) {
        const userString = localStorage.getItem('user');
        if (userString) {
          console.warn('[Auth] Session expired, logging out...');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// For the home page — no login required, uses the original in-memory analysis
export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  const { data } = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data; // returns { success: true, data: result }
};

// For logged-in users — uploads to Cloudinary, saves to DB
export const uploadAndAnalyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  const { data } = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getUserResumes = async () => {
  const { data } = await api.get('/resume/user');
  return data;
};

export const deleteResume = async (id) => {
  const { data } = await api.delete(`/resume/${id}`);
  return data;
};

export const optimizeResume = async (resumeText, jobDescription) => {
  const { data } = await api.post('/ai/optimize', { resumeText, jobDescription });
  return data;
};

export const generateCoverLetterText = async (resumeText, jobDescription) => {
  const { data } = await api.post('/ai/cover-letter', { resumeText, jobDescription });
  return data;
};

export const downloadPDF = async (content, title) => {
  const response = await api.post('/pdf/generate', { content, title }, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// AI Resume Builder endpoints
export const generateTailoredResume = async (resumeText, jobDescription, companyName, roleName) => {
  const { data } = await api.post('/generate/resume', { resumeText, jobDescription, companyName, roleName });
  return data; // returns the structured resume JSON
};

export const generateCoverLetter = async (resumeText, jobDescription, companyName, roleName) => {
  const { data } = await api.post('/generate/cover-letter', { resumeText, jobDescription, companyName, roleName });
  return data; // returns { coverLetter: "..." }
};

export default api;
