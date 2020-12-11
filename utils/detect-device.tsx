import { IncomingHttpHeaders } from 'http';
import { DetectedDevice, DetectionMode } from 'models';

// Mixture of https://github.com/uruha/ccjudge, https://github.com/antonybudianto/react-client-hints & some touch-ups from my side

/**
 *
 * This function parses `@param header` and `@returns DetectedDevice`
 *
 * @param headers Request headers received from the server
 *
 * NOTE:
 *
 * To enable Client Hints, server should be configured to accept relevant headers [eg:1]
 *
 * Alternatively, this can be configured in client-side as well [eg:2]
 *
 * @example
 * eg:1 - Accept-CH: DPR, Width, Viewport-Width
 * eg:2 - <meta http-equiv="Accept-CH" content="DPR,Width,Viewport-Width">
 *
 * */
export default function detectDevice(
  headers: IncomingHttpHeaders
): DetectedDevice {
  let isMobile = false;
  let detectionMode: DetectionMode | null = null;
  const get = (h: string) => (headers[h] as string) || null;
  const deviceInfo = {
    ua: get('sec-ch-ua'),
    dpr: get('dpr'),
    ect: get('ect'),
    rtt: get('rtt'),
    model: get('sec-ch-ua-model'),
    mobile: get('sec-ch-ua-mobile') || get('sec-ch-mobile'),
    downlink: get('downlink'),
    platform: get('sec-ch-ua-platform'),
    saveData: get('save-data'),
    architecture: get('sec-ch-ua-arch'),
    deviceMemory: get('device-memory'),
    viewportWidth: get('viewport-width'),
    legacyUserAgent: get('user-agent'),
  };
  const { legacyUserAgent, mobile } = deviceInfo;
  if (mobile && typeof mobile === 'string') {
    // client hint detection
    detectionMode = 'clientHint';
    const acceptedValues = ['1', '?1', '?mobile1'];
    isMobile = [
      /^\?1$/,
      /^\?(\d{1})$/,
      /^\?(mobile\d{1})$/,
      /^\?(?<mobile>\d{1})$/, // named groups are not supported by every underlying runtime environment/platform
    ].some(s => acceptedValues.includes(s.exec(mobile)?.[0]));
  } else if (legacyUserAgent) {
    // user agent detection
    detectionMode = 'legacy';
    const isIOS = /iP(hone|(o|a)d)/.test(legacyUserAgent);
    const isAndroid = /Android/.test(legacyUserAgent);
    isMobile = isIOS || isAndroid;
  } else {
    isMobile = false;
  }
  return { isMobile, detectionMode, deviceInfo };
}
