'use client'

export interface WorkloadItem {
  id: string
  name: string
  provider: 'AWS' | 'GCP' | 'K8S'
  region: string
  environment: 'Staging' | 'Dev' | 'QA' | 'Production'
  isProduction: boolean
  cpu: number
  network_kbps: number
  active_connections: number
  iops: 'Low' | 'Medium' | 'High'
  idle_confidence: number
  current_cost_day: number
  potential_savings_day: number
  hourly_cost: number
  state: 'RUNNING' | 'PAUSED' | 'HYDRATING' | 'RECLAIMED'
  last_activity: string
  recommended_action: 'Safe to reclaim' | 'Active workload' | 'Protected: Production' | 'Pre-warm scheduled'
  snapshot_id?: string
  tags: Record<string, string>
  isLiveHardware?: boolean
  lastReceivedTimestamp?: string
  hydrationTimeMs?: number
}

export interface VaultSnapshot {
  id: string
  snapshot_id: string
  workload_name: string
  created_at: string
  retention_days: number
  size_gb: number
  region: string
  status: 'VAULTED' | 'RESTORED'
  restore_time_benchmark: string
  encryption: string
  provider: 'AWS' | 'GCP' | 'K8S'
}

export interface GhostAsset {
  id: string
  name: string
  resource_id: string
  type: 'UNATTACHED_VOLUME' | 'UNASSOCIATED_EIP' | 'ORPHANED_SNAPSHOT' | 'IDLE_ALB' | 'UNUSED_DISK' | 'ZOMBIE_K8S_POD'
  provider: 'AWS' | 'GCP' | 'K8S'
  region: string
  age_days: number
  monthly_cost: number
  size_gb: number
  risk: 'Low' | 'Medium' | 'High'
  recommended_action: 'Review / Reclaim' | 'Snapshot & Purge' | 'Release IP' | 'Drain Pods'
  status: 'ORPHANED' | 'PURGED' | 'VAULTED'
  detected_at: string
}

export interface AuditRecord {
  id: string
  timestamp: string
  user_or_system: 'CloudPulse AI' | 'DevOps User' | 'FinOps Lead' | 'System Scheduler'
  cloud: 'AWS' | 'GCP' | 'K8S'
  resource: string
  action: 'RECLAIM' | 'HYDRATE' | 'SNAPSHOT' | 'POLICY' | 'DISCOVERY' | 'USER_ACTION' | 'GHOST_PURGE'
  reason: string
  savings: string
  snapshot: string
  result: 'Success ✓' | 'Protected ✓' | 'Verified ✓'
}

export interface FinOpsPolicyState {
  production_locked: boolean
  staging_allowed: boolean
  dev_allowed: boolean
  qa_allowed: boolean
  min_idle_time: '30m' | '1h' | '4h'
  min_idle_confidence: 90 | 95 | 98
  snapshot_before_reclaim: boolean
  auto_reclaim: boolean
  rollback_enabled: boolean
  approval_mode: 'AUTO' | 'REQUIRE_APPROVAL'
  protected_namespaces: string[]
  protected_tags: string[]
}

// Initial Mock Datasets
export const initialWorkloads: WorkloadItem[] = [
  {
    id: 'i-0a1b2c3d',
    name: 'staging-api',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'Staging',
    isProduction: false,
    cpu: 1.4,
    network_kbps: 1.8,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 98,
    current_cost_day: 18.40,
    potential_savings_day: 14.70,
    hourly_cost: 0.767,
    state: 'RUNNING',
    last_activity: 'VEGA Aries RISC-V edge stream active',
    recommended_action: 'Safe to reclaim',
    isLiveHardware: true,
    lastReceivedTimestamp: '1 sec ago (115200 baud)',
    hydrationTimeMs: 2370,
    tags: { Environment: 'Staging', Team: 'Backend-Core', Hardware: 'VEGA-Aries-v2' }
  },
  {
    id: 'w-2',
    name: 'dev-frontend-react-02',
    provider: 'AWS',
    region: 'us-west-2',
    environment: 'Dev',
    isProduction: false,
    cpu: 0.4,
    network_kbps: 0.2,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 99,
    current_cost_day: 9.60,
    potential_savings_day: 7.68,
    hourly_cost: 0.400,
    state: 'RUNNING',
    last_activity: '18 hours ago (Off-hours)',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'Dev', Team: 'Frontend', Project: 'Dashboard' }
  },
  {
    id: 'w-3',
    name: 'qa-data-processor-pool',
    provider: 'GCP',
    region: 'us-central1',
    environment: 'QA',
    isProduction: false,
    cpu: 1.2,
    network_kbps: 1.5,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 95,
    current_cost_day: 24.80,
    potential_savings_day: 19.84,
    hourly_cost: 1.033,
    state: 'PAUSED',
    last_activity: '2 days ago',
    recommended_action: 'Safe to reclaim',
    snapshot_id: 'vault-snap-9281',
    tags: { Environment: 'QA', Team: 'Data-Eng', Project: 'ETL-Pipelines' }
  },
  {
    id: 'w-4',
    name: 'prod-payments-gateway-cluster',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'Production',
    isProduction: true,
    cpu: 48.2,
    network_kbps: 184.0,
    active_connections: 1420,
    iops: 'High',
    idle_confidence: 0,
    current_cost_day: 94.20,
    potential_savings_day: 0.00,
    hourly_cost: 3.925,
    state: 'RUNNING',
    last_activity: 'Active traffic (1.4k req/sec)',
    recommended_action: 'Protected: Production',
    tags: { Environment: 'Production', Tier: 'Critical', SLA: '99.99%' }
  },
  {
    id: 'w-5',
    name: 'k8s-qa-microservices-namespace',
    provider: 'K8S',
    region: 'us-east-2',
    environment: 'QA',
    isProduction: false,
    cpu: 0.3,
    network_kbps: 0.8,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 97,
    current_cost_day: 31.50,
    potential_savings_day: 25.20,
    hourly_cost: 1.312,
    state: 'RUNNING',
    last_activity: '11 hours ago (Zero pods active)',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'QA', Cluster: 'k8s-qa-east', Namespace: 'qa-services' }
  },
  {
    id: 'w-6',
    name: 'dev-ai-training-worker',
    provider: 'GCP',
    region: 'europe-west1',
    environment: 'Dev',
    isProduction: false,
    cpu: 1.8,
    network_kbps: 2.1,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 94,
    current_cost_day: 38.00,
    potential_savings_day: 30.40,
    hourly_cost: 1.583,
    state: 'RUNNING',
    last_activity: '9 hours ago',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'Dev', Team: 'AI-Research', GPU: 'None' }
  }
]

export const initialVaultSnapshots: VaultSnapshot[] = [
  {
    id: 'snap-1',
    snapshot_id: 'vault-snap-9281',
    workload_name: 'qa-data-processor-pool',
    created_at: 'Today, 10:32 AM',
    retention_days: 30,
    size_gb: 250,
    region: 'us-central1',
    status: 'VAULTED',
    restore_time_benchmark: '2.34s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'GCP'
  },
  {
    id: 'snap-2',
    snapshot_id: 'vault-snap-8192',
    workload_name: 'staging-api-server-legacy',
    created_at: 'Yesterday, 04:15 PM',
    retention_days: 29,
    size_gb: 120,
    region: 'us-east-1',
    status: 'VAULTED',
    restore_time_benchmark: '2.10s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'AWS'
  },
  {
    id: 'snap-3',
    snapshot_id: 'vault-snap-7741',
    workload_name: 'dev-analytics-node-04',
    created_at: '3 days ago',
    retention_days: 27,
    size_gb: 400,
    region: 'us-west-2',
    status: 'VAULTED',
    restore_time_benchmark: '2.65s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'AWS'
  }
]

export const initialGhostAssets: GhostAsset[] = [
  {
    id: 'g-1',
    name: 'unattached-staging-backup-disk',
    resource_id: 'vol-0a1b2c3d4e5f6g7h8',
    type: 'UNATTACHED_VOLUME',
    provider: 'AWS',
    region: 'us-east-1',
    age_days: 43,
    monthly_cost: 25.00,
    size_gb: 250,
    risk: 'Low',
    recommended_action: 'Review / Reclaim',
    status: 'ORPHANED',
    detected_at: '43 days ago'
  },
  {
    id: 'g-2',
    name: 'orphaned-dev-eip-allocation',
    resource_id: 'eipalloc-0123456789abcdef0',
    type: 'UNASSOCIATED_EIP',
    provider: 'AWS',
    region: 'us-east-1',
    age_days: 28,
    monthly_cost: 3.60,
    size_gb: 0,
    risk: 'Low',
    recommended_action: 'Release IP',
    status: 'ORPHANED',
    detected_at: '28 days ago'
  },
  {
    id: 'g-3',
    name: 'idle-staging-alb-listener',
    resource_id: 'alb-arn-staging-pub-0912',
    type: 'IDLE_ALB',
    provider: 'AWS',
    region: 'us-west-2',
    age_days: 35,
    monthly_cost: 22.50,
    size_gb: 0,
    risk: 'Medium',
    recommended_action: 'Review / Reclaim',
    status: 'ORPHANED',
    detected_at: '35 days ago'
  },
  {
    id: 'g-4',
    name: 'gcp-detached-ssd-persistent-disk',
    resource_id: 'disk-gcp-qa-temp-storage',
    type: 'UNUSED_DISK',
    provider: 'GCP',
    region: 'us-central1',
    age_days: 52,
    monthly_cost: 34.00,
    size_gb: 340,
    risk: 'Low',
    recommended_action: 'Snapshot & Purge',
    status: 'ORPHANED',
    detected_at: '52 days ago'
  },
  {
    id: 'g-5',
    name: 'zombie-k8s-completed-jobs',
    resource_id: 'k8s-job-etl-import-1049',
    type: 'ZOMBIE_K8S_POD',
    provider: 'K8S',
    region: 'us-east-2',
    age_days: 19,
    monthly_cost: 14.20,
    size_gb: 40,
    risk: 'Low',
    recommended_action: 'Drain Pods',
    status: 'ORPHANED',
    detected_at: '19 days ago'
  },
  {
    id: 'g-6',
    name: 'legacy-orphaned-snapshot-archive',
    resource_id: 'snap-legacy-2025-archive-01',
    type: 'ORPHANED_SNAPSHOT',
    provider: 'AWS',
    region: 'us-east-1',
    age_days: 90,
    monthly_cost: 18.00,
    size_gb: 360,
    risk: 'Low',
    recommended_action: 'Snapshot & Purge',
    status: 'ORPHANED',
    detected_at: '90 days ago'
  }
]

export const initialAuditRecords: AuditRecord[] = [
  {
    id: 'aud-001',
    timestamp: '10:32:14 IST',
    user_or_system: 'CloudPulse AI',
    cloud: 'AWS',
    resource: 'staging-api-03',
    action: 'RECLAIM',
    reason: '98% idle confidence (0 active connections, CPU 0.8%)',
    savings: '$14.70/day',
    snapshot: 'vault-snap-9281',
    result: 'Success ✓'
  },
  {
    id: 'aud-002',
    timestamp: '09:15:02 IST',
    user_or_system: 'DevOps User',
    cloud: 'AWS',
    resource: 'dev-frontend-react-02',
    action: 'HYDRATE',
    reason: '1-Click developer warm re-activation request',
    savings: '2.34s recovery',
    snapshot: 'vault-snap-8192',
    result: 'Success ✓'
  },
  {
    id: 'aud-003',
    timestamp: '08:45:00 IST',
    user_or_system: 'System Scheduler',
    cloud: 'AWS',
    resource: 'staging-api-server-legacy',
    action: 'SNAPSHOT',
    reason: 'Pre-reclamation 30-day point-in-time state vaulting',
    savings: 'Protected state',
    snapshot: 'vault-snap-8192',
    result: 'Success ✓'
  },
  {
    id: 'aud-004',
    timestamp: '08:00:19 IST',
    user_or_system: 'CloudPulse AI',
    cloud: 'GCP',
    resource: 'disk-gcp-qa-temp-storage',
    action: 'GHOST_PURGE',
    reason: 'Unattached persistent disk idle for 52 days',
    savings: '$34.00/mo',
    snapshot: 'vault-snap-7741',
    result: 'Success ✓'
  },
  {
    id: 'aud-005',
    timestamp: '07:30:11 IST',
    user_or_system: 'FinOps Lead',
    cloud: 'AWS',
    resource: 'Production Cluster',
    action: 'POLICY',
    reason: 'Production environment locked by default — protected from automated power actions',
    savings: 'Outage Protected',
    snapshot: 'N/A',
    result: 'Protected ✓'
  }
]

export const defaultPolicyState: FinOpsPolicyState = {
  production_locked: true,
  staging_allowed: true,
  dev_allowed: true,
  qa_allowed: true,
  min_idle_time: '30m',
  min_idle_confidence: 95,
  snapshot_before_reclaim: true,
  auto_reclaim: true,
  rollback_enabled: true,
  approval_mode: 'AUTO',
  protected_namespaces: ['production', 'kube-system', 'payments-core'],
  protected_tags: ['Environment=Production', 'Tier=Critical', 'DoNotStop=True']
}
