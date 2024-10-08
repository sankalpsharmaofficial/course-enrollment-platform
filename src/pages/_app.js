import { CourseProvider } from '../context/CourseContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CourseProvider>
      <Component {...pageProps} />
    </CourseProvider>
  );
}

export default MyApp;