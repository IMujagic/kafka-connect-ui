import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  apiUrl: string = '';
  errorMessage: string = '';
  
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if API URL is already set
    const savedUrl = this.storageService.getApiUrl();
    if (savedUrl) {
      this.apiUrl = savedUrl;
    }
  }

  /**
   * Save API URL and navigate to connectors page
   */
  saveApiUrl(): void {
    if (!this.apiUrl) {
      this.errorMessage = 'Please enter a valid Kafka Connect API URL';
      return;
    }

    // Normalize URL (remove trailing slash)
    let normalizedUrl = this.apiUrl.trim();
    if (normalizedUrl.endsWith('/')) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    // Validate URL format
    try {
      // Just check if it's a valid URL format
      new URL(normalizedUrl);
    } catch (e) {
      this.errorMessage = 'Please enter a valid URL (e.g., http://localhost:8083)';
      return;
    }

    // Save to storage
    this.storageService.saveApiUrl(normalizedUrl);
    
    // Navigate to connectors page
    this.router.navigate(['/connectors']);
  }
}
