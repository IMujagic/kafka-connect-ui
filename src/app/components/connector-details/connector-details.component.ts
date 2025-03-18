import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, forkJoin } from 'rxjs';
import { KafkaConnectApiService } from '../../services/kafka-connect-api.service';
import { Connector, ConnectorStatus } from '../../models/connector.model';

@Component({
  selector: 'app-connector-details',
  templateUrl: './connector-details.component.html',
  styleUrls: ['./connector-details.component.scss']
})
export class ConnectorDetailsComponent implements OnInit {
  connectorName: string = '';
  connector: Connector | null = null;
  connectorStatus: ConnectorStatus | null = null;
  loading: boolean = true;
  error: string = '';
  editMode: boolean = false;
  configJson: string = '';
  activeTab: 'info' | 'config' | 'tasks' = 'info';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kafkaConnectApiService: KafkaConnectApiService
  ) {}

  ngOnInit(): void {
    this.connectorName = this.route.snapshot.paramMap.get('name') || '';
    if (!this.connectorName) {
      this.router.navigate(['/connectors']);
      return;
    }
    
    this.loadConnectorDetails();
  }

  /**
   * Load connector details and status
   */
  loadConnectorDetails(): void {
    this.loading = true;
    this.error = '';
    
    // Load both connector details and status in parallel
    forkJoin({
      connector: this.kafkaConnectApiService.getConnector(this.connectorName),
      status: this.kafkaConnectApiService.getConnectorStatus(this.connectorName)
    })
    .pipe(
      catchError(err => {
        this.error = `Failed to load connector details: ${err.message || 'Unknown error'}`;
        throw err;
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (result) => {
        this.connector = result.connector;
        this.connectorStatus = result.status;
        this.configJson = JSON.stringify(this.connector.config, null, 2);
      },
      error: () => {
        // Error already handled in catchError
      }
    });
  }

  /**
   * Get status class for connector state
   */
  getStatusClass(state: string): string {
    switch (state.toLowerCase()) {
      case 'running':
        return 'connector-status-running';
      case 'paused':
        return 'connector-status-paused';
      case 'failed':
        return 'connector-status-failed';
      default:
        return 'connector-status-unassigned';
    }
  }

  /**
   * Toggle edit mode for connector config
   */
  toggleEditMode(): void {
    if (this.editMode) {
      // Exiting edit mode, reset config
      this.configJson = JSON.stringify(this.connector?.config, null, 2);
    }
    this.editMode = !this.editMode;
  }

  /**
   * Save updated connector config
   */
  saveConfig(): void {
    try {
      const config = JSON.parse(this.configJson);
      this.loading = true;
      
      this.kafkaConnectApiService.updateConnectorConfig(this.connectorName, config)
        .pipe(
          catchError(err => {
            this.error = `Failed to update connector config: ${err.message || 'Unknown error'}`;
            throw err;
          }),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (updatedConnector) => {
            this.connector = updatedConnector;
            this.configJson = JSON.stringify(updatedConnector.config, null, 2);
            this.editMode = false;
            this.loadConnectorDetails(); // Reload to get updated status
          },
          error: () => {
            // Error already handled in catchError
          }
        });
    } catch (e) {
      this.error = `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
  }

  /**
   * Delete connector
   */
  deleteConnector(): void {
    if (!confirm(`Are you sure you want to delete connector "${this.connectorName}"?`)) {
      return;
    }
    
    this.loading = true;
    
    this.kafkaConnectApiService.deleteConnector(this.connectorName)
      .pipe(
        catchError(err => {
          this.error = `Failed to delete connector: ${err.message || 'Unknown error'}`;
          throw err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/connectors']);
        },
        error: () => {
          // Error already handled in catchError
        }
      });
  }

  /**
   * Restart connector
   */
  restartConnector(): void {
    this.loading = true;
    
    this.kafkaConnectApiService.restartConnector(this.connectorName)
      .pipe(
        catchError(err => {
          this.error = `Failed to restart connector: ${err.message || 'Unknown error'}`;
          throw err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.loadConnectorDetails(); // Reload to get updated status
        },
        error: () => {
          // Error already handled in catchError
        }
      });
  }

  /**
   * Pause connector
   */
  pauseConnector(): void {
    this.loading = true;
    
    this.kafkaConnectApiService.pauseConnector(this.connectorName)
      .pipe(
        catchError(err => {
          this.error = `Failed to pause connector: ${err.message || 'Unknown error'}`;
          throw err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.loadConnectorDetails(); // Reload to get updated status
        },
        error: () => {
          // Error already handled in catchError
        }
      });
  }

  /**
   * Resume connector
   */
  resumeConnector(): void {
    this.loading = true;
    
    this.kafkaConnectApiService.resumeConnector(this.connectorName)
      .pipe(
        catchError(err => {
          this.error = `Failed to resume connector: ${err.message || 'Unknown error'}`;
          throw err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.loadConnectorDetails(); // Reload to get updated status
        },
        error: () => {
          // Error already handled in catchError
        }
      });
  }

  /**
   * Go back to connectors list
   */
  goBack(): void {
    this.router.navigate(['/connectors']);
  }

  /**
   * Set active tab
   */
  setActiveTab(tab: 'info' | 'config' | 'tasks'): void {
    this.activeTab = tab;
  }
}
