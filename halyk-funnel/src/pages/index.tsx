import { createAttribution } from '@/lib/api/createAttribution';
import {
  CreateAttributionInput,
  CreateAttributionInputType,
} from '@/lib/forms/attribution';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Home() {
  const [step, setStep] = useState(0);

  const methods = useForm<CreateAttributionInputType>({
    resolver: zodResolver(CreateAttributionInput),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    resetField,
  } = methods;

  const gender = watch('gender');

  const onSubmit = async (data: CreateAttributionInputType) => {
    console.log('called', data);
    await createAttribution(data);
  };

  useEffect(() => {
    if (gender) {
      setStep(1);
    }
  }, [gender]);
  console.log('errors', errors);

  return (
    <main className={`min-h-screen bg-[#f7f7f7]`}>
      <div className='max-w-[500px] mx-auto w-100 px-4 py-4 flex flex-col items-center'>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {step === 0 && (
              <FormField
                control={control}
                {...register('gender')}
                render={({ field }) => (
                  <div className='flex gap-8'>
                    <Image
                      alt='male'
                      src='/male.jpg'
                      onClick={() => field.onChange('MALE')}
                      width={100}
                      height={300}
                    />
                    <Image
                      alt='female'
                      src='/female.webp'
                      onClick={() => field.onChange('FEMALE')}
                      width={100}
                      height={300}
                    />
                  </div>
                )}
              />
            )}
            {step === 1 && (
              <>
                <ArrowBackIosNewIcon
                  onClick={() => {
                    setStep(0);
                    resetField('age');
                  }}
                />
                <FormField
                  control={control}
                  {...register('age')}
                  render={({ field }) => (
                    <div className='flex flex-col gap-10'>
                      <button
                        className=''
                        onClick={() => field.onChange('18-24')}
                      >
                        18-24
                      </button>
                      <button
                        className=''
                        onClick={() => field.onChange('25-34')}
                      >
                        25-34
                      </button>
                      <button
                        className=''
                        onClick={() => field.onChange('35-44')}
                      >
                        35-44
                      </button>
                      <button
                        className=''
                        onClick={() => field.onChange('45+')}
                      >
                        45+
                      </button>
                    </div>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </div>
    </main>
  );
}
