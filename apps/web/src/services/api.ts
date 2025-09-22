import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RegisterDto, LoginDto, CreateListingDto, UpdateListingDto } from '@realtydirect/lib';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.Authorization;
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/api/auth/login', { email, password });
  }

  async register(data: RegisterDto): Promise<AxiosResponse> {
    return this.api.post('/api/auth/register', data);
  }

  async getProfile(): Promise<AxiosResponse> {
    return this.api.get('/api/auth/profile');
  }

  async logout(): Promise<AxiosResponse> {
    return this.api.post('/api/auth/logout');
  }

  // Listings endpoints
  async getListings(params?: any): Promise<AxiosResponse> {
    return this.api.get('/api/listings', { params });
  }

  async getListing(id: string): Promise<AxiosResponse> {
    return this.api.get(`/api/listings/${id}`);
  }

  async createListing(data: CreateListingDto): Promise<AxiosResponse> {
    return this.api.post('/api/listings', data);
  }

  async updateListing(id: string, data: UpdateListingDto): Promise<AxiosResponse> {
    return this.api.patch(`/api/listings/${id}`, data);
  }

  async deleteListing(id: string): Promise<AxiosResponse> {
    return this.api.delete(`/api/listings/${id}`);
  }

  async uploadListingImages(id: string, images: string[]): Promise<AxiosResponse> {
    return this.api.post(`/api/listings/${id}/images`, { images });
  }

  // Transactions endpoints
  async getTransactions(): Promise<AxiosResponse> {
    return this.api.get('/api/transactions');
  }

  async getTransaction(id: string): Promise<AxiosResponse> {
    return this.api.get(`/api/transactions/${id}`);
  }

  async createTransaction(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/transactions', data);
  }

  async makeOffer(transactionId: string, offerData: any): Promise<AxiosResponse> {
    return this.api.post(`/api/transactions/${transactionId}/offer`, offerData);
  }

  // Documents endpoints
  async generateDocument(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/documents/generate', data);
  }

  async getDocument(id: string): Promise<AxiosResponse> {
    return this.api.get(`/api/documents/${id}`);
  }

  // Mortgage endpoints
  async calculateMortgage(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/mortgage/calculate', data);
  }

  async requestPreapproval(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/mortgage/preapproval', data);
  }

  // AI endpoints
  async reviewDocument(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/ai/review-document', data);
  }

  async suggestCounter(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/ai/suggest-counter', data);
  }

  // Education endpoints
  async getEducationCourses(filters?: any): Promise<AxiosResponse> {
    return this.api.get('/api/education/courses', { params: filters });
  }

  async getEducationCourse(id: string): Promise<AxiosResponse> {
    return this.api.get(`/api/education/courses/${id}`);
  }

  async enrollInCourse(courseId: string): Promise<AxiosResponse> {
    return this.api.post(`/api/education/courses/${courseId}/enroll`);
  }

  async getMyCourses(): Promise<AxiosResponse> {
    return this.api.get('/api/education/my-courses');
  }

  async getModuleContent(courseId: string, moduleId: string): Promise<AxiosResponse> {
    return this.api.get(`/api/education/courses/${courseId}/modules/${moduleId}`);
  }

  async updateEducationProgress(data: any): Promise<AxiosResponse> {
    return this.api.post('/api/education/progress', data);
  }

  async getRecoResources(category?: string): Promise<AxiosResponse> {
    return this.api.get('/api/education/reco-resources', { params: { category } });
  }

  async getSelfRepresentationGuides(category?: string): Promise<AxiosResponse> {
    return this.api.get('/api/education/self-representation-guide', { params: { category } });
  }

  async getLicensingRequirements(): Promise<AxiosResponse> {
    return this.api.get('/api/education/licensing-requirements');
  }

  async getContinuingEducation(): Promise<AxiosResponse> {
    return this.api.get('/api/education/continuing-education');
  }

  async getMyEducationProgress(): Promise<AxiosResponse> {
    return this.api.get('/api/education/my-progress');
  }
}

export const apiService = new ApiService();
