import { DetectedDevice } from 'models';
import { NextPageContext } from 'next';
import detectDevice from 'utils/detect-device';

export default function Home(p: DetectedDevice) {
  return (
    <>
      How to setup ClientHints on Chromium based browsers like Chrome, Edge etc:
      <ul>
        <li>Navigate to chrome://flags or edge://flags</li>
        <li>
          Enable "Experimental Web Platform features" and "Freeze User-Agent
          request header"
        </li>
        <li>Reload the browser</li>
        <li>
          Make sure the page must be loaded with <b>https</b> protocol
        </li>
      </ul>
      <br />
      Result: (Detection priority: clientHint {'>'} legacy)
      <br />
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = ({ req: { headers } }: NextPageContext) => {
  return { props: detectDevice(headers) };
};
