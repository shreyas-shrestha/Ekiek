export type SourceKind =
  | "note"
  | "spreadsheet"
  | "pdf"
  | "code"
  | "browser"
  | "email"
  | "calendar"
  | "memory"
  | "integration";

export type Sensitivity =
  | "public"
  | "normal"
  | "private"
  | "financial"
  | "health"
  | "credential"
  | "client_confidential";

export type MemoryType =
  | "preference"
  | "fact"
  | "goal"
  | "project"
  | "decision"
  | "relationship"
  | "procedure"
  | "recurring_task"
  | "sensitive_constraint";

export type ActiveSurface =
  | "workspace"
  | "browser"
  | "email"
  | "calendar"
  | "codebase"
  | "spreadsheet"
  | "pdf"
  | "claude"
  | "cursor";

export type ModelTarget = "local" | "cloud" | "mcp_client" | "cursor" | "claude";

export type PrivacyMode = "fully_local" | "ask_before_cloud" | "allow_selected_cloud";

export type ContextSource = {
  id: string;
  kind: SourceKind;
  title: string;
  content: string;
  path?: string;
  range?: string;
  surface?: ActiveSurface;
  space: string;
  sensitivity: Sensitivity;
  tags: string[];
  entities: string[];
  updatedAt: string;
  trust: number;
  tokenEstimate: number;
  citations: Array<{
    label: string;
    locator: string;
  }>;
};

export type Memory = {
  id: string;
  type: MemoryType;
  content: string;
  evidenceSourceIds: string[];
  confidence: number;
  scope: string;
  sensitivity: Sensitivity;
  allowedUses: string[];
  validFrom: string;
  validUntil?: string;
  approved: boolean;
};

export type ContextRequest = {
  task: string;
  activeSurface: ActiveSurface;
  activeItemId?: string;
  space: string;
  maxTokens: number;
  modelTarget: ModelTarget;
  privacyMode: PrivacyMode;
  allowedSensitivity: Sensitivity[];
};

export type ContextPacket = {
  id: string;
  task: string;
  summary: string;
  included: Array<{
    source: ContextSource;
    reason: string;
    score: number;
  }>;
  excluded: Array<{
    source: ContextSource;
    reason: string;
    score: number;
  }>;
  memories: Memory[];
  warnings: string[];
  permittedActions: string[];
  blockedActions: string[];
  tokenEstimate: number;
  dataLeavesDevice: boolean;
};

export type ScoredSource = {
  source: ContextSource;
  score: number;
  signals: string[];
  penalties: string[];
};

export type PermissionDecision = {
  action: string;
  level: "allowed" | "approval_required" | "blocked";
  reason: string;
};
