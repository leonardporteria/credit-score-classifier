import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function App() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM',
    });
  }

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex justify-between p-8'>
        <h1 className='text-4xl font-bold text-neutral-100'>
          Credit Score Classifier
        </h1>
        <div className='flex gap-4'>
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

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' onClick={() => {}}>
              Show Toast
            </Button>
          </form>
        </Form>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
