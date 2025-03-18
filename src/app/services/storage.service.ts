import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly API_URL_KEY = 'kafka_connect_api_url';
  private apiUrlSubject = new BehaviorSubject<string>('');

  constructor() {
    // Initialize from localStorage
    const savedUrl = this.getApiUrl();
    if (savedUrl) {
      this.apiUrlSubject.next(savedUrl);
    }
  }

  /**
   * Save API URL to localStorage
   */
  saveApiUrl(url: string): void {
    localStorage.setItem(this.API_URL_KEY, url);
    this.apiUrlSubject.next(url);
  }

  /**
   * Get API URL from localStorage
   */
  getApiUrl(): string {
    return localStorage.getItem(this.API_URL_KEY) || '';
  }

  /**
   * Get API URL as an Observable
   */
  getApiUrl$(): Observable<string> {
    return this.apiUrlSubject.asObservable();
  }

  /**
   * Check if API URL is set
   */
  hasApiUrl(): boolean {
    return !!this.getApiUrl();
  }

  /**
   * Clear API URL from localStorage
   */
  clearApiUrl(): void {
    localStorage.removeItem(this.API_URL_KEY);
    this.apiUrlSubject.next('');
  }
}
