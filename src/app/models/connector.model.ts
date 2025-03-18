export interface Connector {
  name: string;
  config: ConnectorConfig;
  tasks: Task[];
  type: string;
}

export interface ConnectorConfig {
  [key: string]: string;
}

export interface Task {
  connector: string;
  task: number;
}

export interface ConnectorStatus {
  name: string;
  connector: {
    state: string;
    worker_id: string;
  };
  tasks: TaskStatus[];
  type: string;
}

export interface TaskStatus {
  id: number;
  state: string;
  worker_id: string;
  trace?: string;
}
