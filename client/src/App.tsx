import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

import { Button } from './components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div>
        <h1>Credit Score Classifier</h1>
        <div>
          <Button variant='outline' size='icon' asChild>
            <a
              href='https://github.com/leonardporteria/credit-score-classifier'
              target='_blank'
            >
              <GitHubLogoIcon className='h-4 w-4' />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
