'use client'

export interface WorkloadItem {
  id: string
  name: string
  resource_type: string
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
  recommended_action: string
  snapshot_id?: string
  tag?: string
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

// 5 Mock Cloud Workloads (all starting as RUNNING per VEGATHON specification)
export const initialWorkloads: WorkloadItem[] = [
  {
    id: 'i-0a1b2c3d',
    name: 'staging-api',
    resource_type: 'Staging Server',
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
    last_activity: 'VEGA Aries RISC-V edge telemetry active',
    recommended_action: 'Safe to reclaim',
    isLiveHardware: true,
    lastReceivedTimestamp: '1 sec ago (115200 baud)',
    hydrationTimeMs: 2370,
    tags: { Environment: 'Staging', Team: 'Backend-Core', Hardware: 'VEGA-Aries-v2' }
  },
  {
    id: 'i-0e4f5g6h',
    name: 'dev-worker',
    resource_type: 'Dev Environment',
    provider: 'AWS',
    region: 'us-west-2',
    environment: 'Dev',
    isProduction: false,
    cpu: 0.8,
    network_kbps: 0.5,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 99,
    current_cost_day: 9.60,
    potential_savings_day: 7.68,
    hourly_cost: 0.400,
    state: 'RECLAIMED',
    last_activity: 'Real Bitbrains VM trace replay active (Off-hours idle)',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'Dev', Team: 'Frontend', DataSource: 'Bitbrains-GWA-T-12' }
  },
  {
    id: 'i-0q7r8s9t',
    name: 'qa-runner',
    resource_type: 'QA Test Server',
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
    state: 'RECLAIMED',
    last_activity: 'Real Azure VM trace replay active (Zero job queue)',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'QA', Team: 'Data-Eng', DataSource: 'Azure-Public-Traces' }
  },
  {
    id: 'i-0m5n6o1p',
    name: 'batch-worker',
    resource_type: 'Batch Processor',
    provider: 'K8S',
    region: 'us-east-2',
    environment: 'Dev',
    isProduction: false,
    cpu: 0.9,
    network_kbps: 0.8,
    active_connections: 0,
    iops: 'Low',
    idle_confidence: 97,
    current_cost_day: 31.50,
    potential_savings_day: 25.20,
    hourly_cost: 1.312,
    state: 'RECLAIMED',
    last_activity: '11 hours ago (Zero pods active)',
    recommended_action: 'Safe to reclaim',
    tags: { Environment: 'Dev', Cluster: 'k8s-dev-east', Namespace: 'batch-processing' }
  },
  {
    id: 'i-0u3v4w5x',
    name: 'sandbox-01',
    resource_type: 'Sandbox',
    provider: 'AWS',
    region: 'us-east-1',
    environment: 'Dev',
    isProduction: false,
    cpu: 78.4,
    network_kbps: 85.0,
    active_connections: 14,
    iops: 'High',
    idle_confidence: 0,
    current_cost_day: 42.00,
    potential_savings_day: 0.00,
    hourly_cost: 1.750,
    state: 'RUNNING',
    last_activity: 'Active user traffic (14 TCP sockets active)',
    recommended_action: 'Active workload',
    tag: 'ACTIVE - not touched',
    tags: { Environment: 'Dev', Tier: 'Sandbox', ActiveUser: 'dev-team' }
  }
]

export const initialVaultSnapshots: VaultSnapshot[] = [
  {
    id: 'snap-1',
    snapshot_id: 'VP-00192',
    workload_name: 'staging-api',
    created_at: 'Just now',
    retention_days: 30,
    size_gb: 45,
    region: 'us-east-1',
    status: 'VAULTED',
    restore_time_benchmark: '2.34s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'AWS'
  },
  {
    id: 'snap-2',
    snapshot_id: 'VP-00193',
    workload_name: 'dev-worker',
    created_at: 'Just now',
    retention_days: 30,
    size_gb: 32,
    region: 'us-west-2',
    status: 'VAULTED',
    restore_time_benchmark: '2.10s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'AWS'
  },
  {
    id: 'snap-3',
    snapshot_id: 'VP-00194',
    workload_name: 'qa-runner',
    created_at: 'Just now',
    retention_days: 30,
    size_gb: 80,
    region: 'us-central1',
    status: 'VAULTED',
    restore_time_benchmark: '2.65s benchmark',
    encryption: 'AES-256 Enabled',
    provider: 'GCP'
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
  }
]

export const initialAuditRecords: AuditRecord[] = [
  {
    id: 'aud-001',
    timestamp: '10:32:14 IST',
    user_or_system: 'CloudPulse AI',
    cloud: 'AWS',
    resource: 'staging-api',
    action: 'RECLAIM',
    reason: '98% idle confidence (0 active connections, CPU 1.4%)',
    savings: '$14.70/day',
    snapshot: 'VP-00192',
    result: 'Success ✓'
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
