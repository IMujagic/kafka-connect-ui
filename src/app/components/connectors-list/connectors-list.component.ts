import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { KafkaConnectApiService } from '../../services/kafka-connect-api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-connectors-list',
  templateUrl: './connectors-list.component.html',
  styleUrls: ['./connectors-list.component.scss']
})
export class ConnectorsListComponent implements OnInit {
  connectors: string[] = [];
  loading: boolean = true;
  error: string = '';
  apiUrl: string = '';

  constructor(
    private kafkaConnectApiService: KafkaConnectApiService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiUrl = this.storageService.getApiUrl();
    this.loadConnectors();
  }

  /**
   * Load connectors from Kafka Connect API
   */
  loadConnectors(): void {
    this.loading = true;
    this.error = '';
    
    this.kafkaConnectApiService.getConnectors()
      .pipe(
        catchError(err => {
          this.error = `Failed to load connectors: ${err.message || 'Unknown error'}`;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(connectors => {
        this.connectors = connectors;
      });
  }

  /**
   * Navigate to connector details page
   */
  viewConnector(name: string): void {
    this.router.navigate(['/connectors', name]);
  }

  /**
   * Change API URL
   */
  changeApiUrl(): void {
    this.storageService.clearApiUrl();
    this.router.navigate(['/']);
  }
}
