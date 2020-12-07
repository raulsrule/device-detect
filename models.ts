export type DeviceInfo = {
  ua: string | null;
  dpr: string | null;
  ect: string | null;
  rtt: string | null;
  model: string | null;
  mobile: string | null;
  downlink: string | null;
  platform: string | null;
  saveData: string | null;
  architecture: string | null;
  deviceMemory: string | null;
  viewportWidth: string | null;
  legacyUserAgent: string | null;
};

export type DetectionMode = 'legacy' | 'clientHint';

export type DetectedDevice = {
  isMobile: boolean;
  deviceInfo: DeviceInfo;
  detectionMode: DetectionMode | null;
};
