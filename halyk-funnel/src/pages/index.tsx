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
import { Button } from '@/components/ui/button';


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
      <div className='max-w-[500px] mx-auto w-100 px-4 py-4 flex flex-col items-center text-center'>
        <Image className="pt-4" src="/logo.svg" alt='logo' width={120} height={25} />
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className=''>
            {step === 0 && (
              <>
                <h1 className='text-[#24234C] break-words font-bold text-center text-3xl my-12'>Пройди тест и узнай сколько стоит твоя безопасность!</h1>
                <FormField
                  control={control}
                  {...register('gender', {
                    onChange: (e) => { console.log(e) },
                  })
                  }
                  render={({ field }) => (
                    <div className='flex justify-around'>
                      <div className="flex flex-col items-center">
                        <Image
                          className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                          alt='male'
                          src='/male.jpg'
                          width={150}
                          height={300}
                        />
                        <Button className='w-40 bg-[#107c54] hover:bg-[#107c54d2] text-[#fdfdfdde] text-lg font-bold h-12' onClick={() => field.onChange('MALE')}>Мужчина</Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image
                          className='rounded-t-[90px] border-[#ecb13c] border-4 border-b-0'
                          alt='female'
                          src='/female.jpeg'
                          width={150}
                          height={300}
                        />
                        <Button className='w-40 bg-[#ecb13c] hover:bg-[#ecb13cc2] text-black text-lg font-bold h-12' onClick={() => field.onChange('FEMALE')}>Женщина</Button>
                      </div>
                    </div>
                  )}
                  />
              </>
            )}
            {step === 1 && (
              <>
                <h1 className='text-[#24234C] break-words font-bold text-center text-3xl my-12'>Укажи возраст</h1>
                <FormField
                  control={control}
                  {...register('age')}
                  render={({ field }) => (
                    <div className='flex flex-wrap gap-8 justify-center'>
                      <div className="flex flex-col items-center">
                        <Image
                          className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                          alt='male'
                          src={gender === 'MALE' ? '/age/youngMan.jpeg' : '/age/youngWoman.jpeg' }
                          width={150}
                          height={300}
                        />
                        <Button className='w-40 bg-[#107c54] hover:bg-[#107c54d2] text-[#fdfdfdde] text-lg font-bold h-12' onClick={() => field.onChange('18-30')}>18-30</Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image
                          className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                          alt='male'
                          src={gender === 'MALE' ? '/age/midMan.jpeg' : '/age/midWoman.jpeg' }
                          width={150}
                          height={300}
                        />
                        <Button className='w-40 bg-[#107c54] hover:bg-[#107c54d2] text-[#fdfdfdde] text-lg font-bold h-12' onClick={() => field.onChange('30-50')}>30-50</Button>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image
                          className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                          alt='male'
                          src={gender === 'MALE' ? '/age/oldMan.jpeg' : '/age/oldWoman.jpeg' }
                          width={150}
                          height={300}
                        />
                        <Button className='w-40 bg-[#107c54] hover:bg-[#107c54d2] text-[#fdfdfdde] text-lg font-bold h-12' onClick={() => field.onChange('50+')}>50+</Button>
                      </div>
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
