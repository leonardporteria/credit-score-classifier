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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  age: z.coerce.number().positive(),
  gender: z.enum(['male', 'female'], {
    required_error: 'You need to select a gender',
  }),
  income: z.coerce.number().positive(),
  education: z.enum(
    [
      'high school diploma',
      "associate's degree",
      "bachelor's degree",
      "master's degree",
      'doctorate',
    ],
    {
      required_error: 'You need to select a Education',
    }
  ),

  marital_status: z.enum(['single', 'married'], {
    required_error: 'You need to select a Marital Status',
  }),
  num_children: z.coerce.number().min(0),
  home_ownership: z.enum(['rented', 'owned'], {
    required_error: 'You need to select a Home Ownership',
  }),
});

function App() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      income: 0,
      num_children: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Submitted!',
      description: `${values.age}`,
    });

    const url = 'https://ibz.pythonanywhere.com/predict';

    const requestBody = {
      user_input: { ...values },
    };

    console.log(requestBody);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
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
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your Age'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='male' />
                        </FormControl>
                        <FormLabel className='font-normal'>Male</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='female' />
                        </FormControl>
                        <FormLabel className='font-normal'>Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='income'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your Income'
                      type='number'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='education'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Education Attainment</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='high school diploma' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          High School Diploma
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value="associate's degree" />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Associate's Degree
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value="bachelor's degree" />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Bachelor's Degree
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value="master's degree" />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Master's Degre
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='doctorate' />
                        </FormControl>
                        <FormLabel className='font-normal'>Doctorate</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='marital_status'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='single' />
                        </FormControl>
                        <FormLabel className='font-normal'>Single</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='married' />
                        </FormControl>
                        <FormLabel className='font-normal'>Married</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='num_children'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Children</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter Your Age'
                      type='number'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='home_ownership'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Home Ownership</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='rented' />
                        </FormControl>
                        <FormLabel className='font-normal'>Rented</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='owned' />
                        </FormControl>
                        <FormLabel className='font-normal'>Owned</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' onClick={() => {}}>
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}

export default App;
