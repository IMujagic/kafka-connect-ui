import { TestBed } from '@angular/core/testing';

import { KafkaConnectApiService } from './kafka-connect-api.service';

describe('KafkaConnectApiService', () => {
  let service: KafkaConnectApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafkaConnectApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
