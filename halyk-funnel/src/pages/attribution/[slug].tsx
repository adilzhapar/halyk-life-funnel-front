import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { patchAttribution } from '@/lib/api/patchAttribution';
import {
  AssetsEnumType,
  AssetsEnumValues,
  FinancialGoalsEnumType,
  FinancialGoalsEnumValues,
  UpdateAttributionInput,
  UpdateAttributionInputType,
} from '@/lib/forms/attribution';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type CustomEventTarget = EventTarget & { name: string; value: any };

const AttributionSteps = () => {
  const [attribution_id, setAttributionId] = useState<string>('');
  const [step, setStep] = useState(0);
  const router = useRouter();

  const methods = useForm<UpdateAttributionInputType>({
    resolver: zodResolver(UpdateAttributionInput),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = methods;

  useEffect(() => {
    if (!router.isReady) return;

    setAttributionId(router.query.slug as string);
  }, [router.isReady, attribution_id, router]);

  const onChange = async (target: HTMLInputElement | CustomEventTarget) => {
    const key = target.name.replace('properties.', '');
    console.log('onChange event values: ', { [key]: target.value });
    await patchAttribution({
      attribution_id,
      properties: { [key]: target.value },
    });
    if (step < 7) {
      setStep((prev) => prev + 1);
    } else {
      router.push(`/result/${attribution_id}`);
    }
  };

  const onSubmit = async (data: UpdateAttributionInputType) => {
    console.log('update called', data);
  };

  const handleClickBack = () => {
    if (step === 1) {
      router.push('/');
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const toggleFinancialGoal = (
    currentGoals: FinancialGoalsEnumValues,
    goal: FinancialGoalsEnumType
  ) => {
    const newCurrentGoals = currentGoals.includes(goal)
      ? currentGoals.filter((currentGoal) => currentGoal !== goal)
      : [...currentGoals, goal];
    setValue('properties.financial_goals', newCurrentGoals);
  };

  const toggleAssets = (
    currentAssets: AssetsEnumValues,
    asset: AssetsEnumType
  ) => {
    const newCurrentAssets = currentAssets.includes(asset)
      ? currentAssets.filter((currentAsset) => currentAsset !== asset)
      : [...currentAssets, asset];
    setValue('properties.assets', newCurrentAssets);
  };

  return (
    <main className={`min-h-screen bg-[#f7f7f7]`}>
      <div className='max-w-[500px] mx-auto w-100 px-4 py-4 flex flex-col items-center text-center'>
        {step > 0 && (
          <>
            <div className='w-full flex max-auto justify-between py-4 items-center'>
              <ArrowBackIosNew
                color='disabled'
                className='cursor-pointer'
                onClick={() => handleClickBack()}
              />
              <Image src='/logo.svg' alt='logo' width={150} height={36} />
              <p className='font-bold'>
                <span className='text-[#107c54]'>{step}&nbsp;/</span>&nbsp;7
              </p>
            </div>
            <Progress value={step * 14.2} className='mb-10 ' />
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 w-full'>
          {step === 0 && (
            <div className='w-full flex flex-col items-center max-auto'>
              <Image
                className='pt-4'
                src='/logo.svg'
                alt='logo'
                width={120}
                height={25}
              />
              <Image className='my-10 rounded-[40px]' src='/apashka.jpeg' alt='apashka' width={200} height={300}/>
              <h1 className='text-center text-4xl font-extrabold text-[#107c54] py-6'>90 миллиардов тенге</h1>
              <p className='text-center text-lg font-medium text-[#182c14]'>выплатили Казахстанцам в рамках страхования жизни за прошлый год.</p>
              <p className='text-center text-lg font-medium text-[#182c14] pt-4'>По данным gov.kz количество заключенных договоров страхования увеличилось на <span className='text-center font-bold text-[#107c54]'>32,3 %</span> по сравнению с прошлым годом.</p>

              <div className=' fixed bottom-0 left-0 right-0 mb-4 mx-4'>
                <Button
                  className='w-full bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12 max-w-[400px]'
                  onClick={() => setStep((prev) => prev + 1)}
                >
                  Продолжить
                </Button>
              </div>
            </div>
          )}
          {step === 1 && (
            <FormField
              control={control}
              {...register('properties.income_level', {
                onChange: (e) => {
                  onChange(e.target);
                },
              })}
              render={({ field }) => (
                <>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Выбери свой текущий доход
                  </h1>
                  <div className='flex flex-wrap gap-8 justify-center'>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                        alt='male'
                        src='/income/high.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('HIGH')}
                      >
                        1kk +
                      </Button>
                    </div>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                        alt='male'
                        src='/income/middle.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('MEDIUM')}
                      >{`400k-800k`}</Button>
                    </div>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#107c54] border-4 border-b-0'
                        alt='male'
                        src='/income/low.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('LOW')}
                      >{`< 400k`}</Button>
                    </div>
                  </div>
                </>
              )}
            />
          )}
          {step === 2 && (
            <FormField
              control={control}
              {...register('properties.work_style', {
                onChange: (e) => {
                  onChange(e.target);
                },
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Какой у вас формат работы?
                  </h1>
                  <div className='flex flex-wrap gap-8 justify-center'>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#dddddd] border-2 border-b-0'
                        alt='male'
                        src='/work/physical.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('PHYSICAL')}
                      >
                        Физический
                      </Button>
                    </div>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#dddddd] border-2 border-b-0'
                        alt='male'
                        src='/work/office.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('OFFICE')}
                      >
                        Офисный
                      </Button>
                    </div>
                    <div className='flex flex-col items-center max-h-96'>
                      <Image
                        className='rounded-t-[90px] border-[#dddddd] border-2 border-b-0'
                        alt='male'
                        src='/work/remote.jpeg'
                        width={150}
                        height={300}
                      />
                      <Button
                        className='w-40 bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                        onClick={() => field.onChange('REMOTE')}
                      >
                        Удаленный
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
          )}
          {step === 3 && (
            <FormField
              control={control}
              {...register('properties.number_of_dependants')}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Сколько человек зависит от вашего дохода
                  </h1>
                  <Input onChange={field.onChange} type='number' />
                  <Button
                    className=' bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12'
                    onClick={() =>
                      onChange({
                        name: field.name,
                        value: field.value,
                      } as CustomEventTarget)
                    }
                  >
                    Дальше
                  </Button>
                </div>
              )}
            />
          )}
          {step === 4 && (
            <FormField
              control={control}
              {...register('properties.health_status', {
                onChange: (e) => {
                  onChange(e.target);
                },
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Как бы вы оценили состояние вашего здоровья
                  </h1>
                  <div className='flex flex-col gap-8'>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('BAD')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Нужно лечение
                      </span>
                    </Button>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('GOOD')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Не жалуюсь
                      </span>
                    </Button>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('EXCELLENT')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Полностью здоров
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            />
          )}
          {step === 5 && (
            <FormField
              control={control}
              {...register('properties.financial_goals')}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Какие у вас финансовые ценности?
                  </h1>
                  <div className='flex flex-col gap-8'>
                    <Button
                      className={
                        field.value?.includes('DEBT_PAYMENT')
                        ? `bg-[#288965] className='flex p-5 rounded-lg hover:bg-[#107c54d2] focus:bg-[#288965]' text-[#fdfdfdde]`
                        : `className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]' text-[#182c14]`
                      }
                      onClick={() => {
                        toggleFinancialGoal(field.value ?? [], 'DEBT_PAYMENT');
                      }}
                    >
                      <span className='text-base font-bold '>
                        Закрыть долги
                      </span>
                    </Button>
                    <Button
                      className={
                        field.value?.includes('CHILDREN_EDUCATION')
                        ? `bg-[#288965] className='flex p-5 rounded-lg hover:bg-[#107c54d2] focus:bg-[#288965]' text-[#fdfdfdde]`
                        : `className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]' text-[#182c14]`
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'CHILDREN_EDUCATION'
                        );
                      }}
                    >
                      <span className='text-base font-bold '>
                        Оплатить обучение детей
                      </span>
                    </Button>
                    <Button
                      className={
                        field.value?.includes('MORTGAGE_PROTECTION')
                        ? `bg-[#288965] className='flex p-5 rounded-lg hover:bg-[#107c54d2] focus:bg-[#288965]' text-[#fdfdfdde]`
                        : `className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]' text-[#182c14]`
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'MORTGAGE_PROTECTION'
                        );
                      }}
                    >
                      <span className='text-base font-bold '>
                        Предостеречься от ипотеки
                      </span>
                    </Button>
                    <Button
                      className={
                        field.value?.includes('INCOME_REPLACEMENT')
                          ? `bg-[#288965] className='flex p-5 rounded-lg hover:bg-[#107c54d2] focus:bg-[#288965]' text-[#fdfdfdde]`
                          : `className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]' text-[#182c14]`
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'INCOME_REPLACEMENT'
                        );
                      }}
                    >
                      <span className='text-base font-bold '>
                        Пассивный доход
                      </span>
                    </Button>
                  </div>
                  <Button
                    className='bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12 mt-4'
                    onClick={() =>
                      onChange({
                        name: field.name,
                        value: field.value,
                      } as CustomEventTarget)
                    }
                  >
                    Дальше
                  </Button>
                </div>
              )}
            />
          )}
          {step === 6 && (
            <FormField
              control={control}
              {...register('properties.debt_level', {
                onChange: (e) => {
                  onChange(e.target);
                },
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                    Уровень долга
                  </h1>
                  <div className='flex flex-col gap-8'>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('LOW')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Низкий
                      </span>
                    </Button>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('MEDIUM')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Средний
                      </span>
                    </Button>
                    <Button
                      className='flex p-5 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4] focus:bg-[#288965]'
                      onClick={() => field.onChange('HIGH')}
                    >
                      <span className='text-base font-bold text-[#182c14]'>
                        Высокий
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            />
          )}
          {step === 7 && (
            <>
              <FormField
                control={control}
                {...register('properties.assets')}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1 className='text-2xl font-bold text-[#182c14] text-center'>
                      Какие у вас имеются активы?
                    </h1>
                    <div className='grid grid-cols-2 gap-8'>
                      <div
                        className={
                          field.value?.includes('INVESTMENT')
                            ? `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#c4c4c4] hover:bg-[#acacac]`
                            : `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4]`
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'INVESTMENT');
                        }}
                      >
                        <Image
                          src='/assets/bar_chart.png'
                          alt='chart'
                          width={60}
                          height={60}
                        />
                        <span className='text-base font-bold text-[#182c14]'>
                          Инвестиции
                        </span>
                      </div>
                      <div
                        className={
                          field.value?.includes('SAVINGS')
                            ? `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#c4c4c4] hover:bg-[#acacac]`
                            : `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4]`
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'SAVINGS');
                        }}
                      >
                        <Image
                          src='/assets/moneybag.png'
                          alt='chart'
                          width={60}
                          height={60}
                        />
                        <span className='text-base font-bold text-[#182c14]'>
                          Сбережения
                        </span>
                      </div>
                      <div
                        className={
                          field.value?.includes('PROPERTY')
                            ? `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#c4c4c4] hover:bg-[#acacac]`
                            : `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4]`
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'PROPERTY');
                        }}
                      >
                        <Image
                          src='/assets/property.png'
                          alt='chart'
                          width={60}
                          height={60}
                        />
                        <span className='text-base font-bold text-[#182c14]'>
                          Собственность
                        </span>
                      </div>
                      <div
                        className={
                          field.value?.includes('BUSINESS')
                            ? `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#c4c4c4] hover:bg-[#acacac]`
                            : `col-span-1 group flex flex-col  justify-center items-center px-2 py-8 rounded-lg bg-[#dddddd] hover:bg-[#c4c4c4]`
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'BUSINESS');
                        }}
                      >
                        <Image
                          src='/assets/business.png'
                          alt='chart'
                          width={60}
                          height={60}
                        />
                        <span className='text-base font-bold text-[#182c14]'>
                          Бизнес
                        </span>
                      </div>
                    </div>
                    <Button
                      className='bg-[#107c54] hover:bg-[#107c54d2] focus:bg-[#ecb13c] text-[#fdfdfdde] text-lg font-bold h-12 mt-4'
                      onClick={() =>
                        onChange({
                          name: field.name,
                          value: field.value,
                        } as CustomEventTarget)
                      }
                    >
                      Узнать предлагаемую сумму
                    </Button>
                  </div>
                )}
              />
            </>
          )}
        </form>
      </div>
    </main>
  );
};

export default AttributionSteps;
