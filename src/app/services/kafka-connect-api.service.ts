import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Connector, ConnectorStatus } from '../models/connector.model';

@Injectable({
  providedIn: 'root'
})
export class KafkaConnectApiService {
  // Use proxy to avoid CORS issues
  private readonly API_PREFIX = '/api';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  /**
   * Get base URL for API requests
   */
  private getBaseUrl(): string {
    // Always use the proxy to avoid CORS issues
    return this.API_PREFIX;
  }

  /**
   * Get all connectors
   */
  getConnectors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.getBaseUrl()}/connectors`);
  }

  /**
   * Get connector details
   */
  getConnector(name: string): Observable<Connector> {
    return this.http.get<Connector>(`${this.getBaseUrl()}/connectors/${name}`);
  }

  /**
   * Get connector status
   */
  getConnectorStatus(name: string): Observable<ConnectorStatus> {
    return this.http.get<ConnectorStatus>(`${this.getBaseUrl()}/connectors/${name}/status`);
  }

  /**
   * Update connector config
   */
  updateConnectorConfig(name: string, config: any): Observable<Connector> {
    return this.http.put<Connector>(`${this.getBaseUrl()}/connectors/${name}/config`, config);
  }

  /**
   * Delete connector
   */
  deleteConnector(name: string): Observable<any> {
    return this.http.delete(`${this.getBaseUrl()}/connectors/${name}`);
  }

  /**
   * Restart connector
   */
  restartConnector(name: string): Observable<any> {
    return this.http.post(`${this.getBaseUrl()}/connectors/${name}/restart`, {});
  }

  /**
   * Pause connector
   */
  pauseConnector(name: string): Observable<any> {
    return this.http.put(`${this.getBaseUrl()}/connectors/${name}/pause`, {});
  }

  /**
   * Resume connector
   */
  resumeConnector(name: string): Observable<any> {
    return this.http.put(`${this.getBaseUrl()}/connectors/${name}/resume`, {});
  }
}
