import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';
import { useAtomValue } from 'jotai';
import { langAtom } from './states/atoms';

function App() {
  const lang = useAtomValue(langAtom);
  return (
    <div
      className={`w-full h-full ${lang === 'fr' ? 'text-left' : 'text-right'} `}
    >
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
