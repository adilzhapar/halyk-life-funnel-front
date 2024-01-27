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
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
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
    const attributionId = uuidv4();
    await createAttribution({...data, attribution_id: attributionId});
    router.push(`/attribution/${attributionId}`);
  };

  useEffect(() => {
    if (gender) {
      setStep(1);
    }
  }, [gender]);

  return (
    <main className={`min-h-screen bg-[#f7f7f7]`}>
      <div className='max-w-[500px] mx-auto w-100 px-4 py-4 flex flex-col items-center'>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {step === 0 && (
              <FormField
                control={control}
                {...register('gender', {
                  onChange: (e) => { console.log(e) },
                })
                }
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
