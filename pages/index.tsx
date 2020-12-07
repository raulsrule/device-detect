import { DetectedDevice } from 'models';
import { NextPageContext } from 'next';
import detectDevice from 'utils/detect-device';

export default function Home(p: DetectedDevice) {
  return <pre>{JSON.stringify(p, null, 2)}</pre>;
}

export const getServerSideProps = ({ req: { headers } }: NextPageContext) => {
  return { props: detectDevice(headers) };
};
