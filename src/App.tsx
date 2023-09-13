import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';
import { useAtomValue } from 'jotai';
import { langAtom } from './states/atoms';
import { needsServices } from './services/needs/needsServices';
import { useEffect } from 'react';

function App() {
  const lang = useAtomValue(langAtom);
  const needsService = needsServices();
  useEffect(() => {
    const unsubscribe = needsService.getRealtimeNeeds();

    return () => {
      unsubscribe();
    };
  }, []);
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
