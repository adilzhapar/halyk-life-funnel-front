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
      router.push(`/`);
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
            <div className='w-full flex justify-between py-4 items-center'>
              <ArrowBackIosNew
                color='disabled'
                className='cursor-pointer'
                onClick={() => handleClickBack()}
              />
              <Image src='/logo.svg' alt='logo' width={150} height={36} />
              <p className='font-bold'>
                <span className='text-[#107c54]'>{step}&nbsp;/</span>&nbsp;8
              </p>
            </div>
            <Progress value={step * 14.5} className='mb-10' />
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {step === 0 && (
            <>
              <h1>info about insurance</h1>
              <Button onClick={() => setStep((prev) => prev + 1)}>
                Продолжить
              </Button>
            </>
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
                <div className='flex flex-col gap-8'>
                  <h1>Укажите текущий уровень дохода</h1>
                  <div className='flex flex-col gap-8'>
                    <Button onClick={() => field.onChange('LOW')}>
                      Ниже среднего
                    </Button>
                    <Button onClick={() => field.onChange('MEDIUM')}>
                      Средний
                    </Button>
                    <Button onClick={() => field.onChange('HIGH')}>
                      Выше среднего
                    </Button>
                  </div>
                </div>
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
                  <h1>Какой у вас формат работы?</h1>
                  <div className='flex flex-col gap-8'>
                    <Button onClick={() => field.onChange('PHYSICAL')}>
                      Физический
                    </Button>
                    <Button onClick={() => field.onChange('OFFICE')}>
                      Офисный
                    </Button>
                    <Button onClick={() => field.onChange('REMOTE')}>
                      Удаленный
                    </Button>
                    <Button onClick={() => field.onChange('OTHER')}>
                      Другое
                    </Button>
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
                  <h1>Сколько человек зависит от вашего дохода</h1>
                  <Input onChange={field.onChange} type='number' />
                  <Button
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
                  <h1>Как бы вы оценили состояние вашего здоровья</h1>
                  <div className='flex flex-col gap-8'>
                    <Button onClick={() => field.onChange('BAD')}>
                      Нужно лечение
                    </Button>
                    <Button onClick={() => field.onChange('GOOD')}>
                      Не жалуюсь
                    </Button>
                    <Button onClick={() => field.onChange('EXCELLENT')}>
                      Полностью здоров
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
                  <h1>Какие у вас финансовые ценности?</h1>
                  <div className='flex flex-col gap-8'>
                    <Button
                      className={
                        field.value?.includes('DEBT_PAYMENT')
                          ? `border-2 border-red-500`
                          : ``
                      }
                      onClick={() => {
                        toggleFinancialGoal(field.value ?? [], 'DEBT_PAYMENT');
                      }}
                    >
                      Закрыть долги
                    </Button>
                    <Button
                      className={
                        field.value?.includes('CHILDREN_EDUCATION')
                          ? `border-2 border-red-500`
                          : ``
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'CHILDREN_EDUCATION'
                        );
                      }}
                    >
                      Оплатить обучение детей
                    </Button>
                    <Button
                      className={
                        field.value?.includes('MORTGAGE_PROTECTION')
                          ? `border-2 border-red-500`
                          : ``
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'MORTGAGE_PROTECTION'
                        );
                      }}
                    >
                      Защита от ипотеки
                    </Button>
                    <Button
                      className={
                        field.value?.includes('INCOME_REPLACEMENT')
                          ? `border-2 border-red-500`
                          : ``
                      }
                      onClick={() => {
                        toggleFinancialGoal(
                          field.value ?? [],
                          'INCOME_REPLACEMENT'
                        );
                      }}
                    >
                      Пассивный доход
                    </Button>
                  </div>
                  <Button
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
                  <h1>Уровень долга</h1>
                  <div className='flex flex-col gap-8'>
                    <Button onClick={() => field.onChange('LOW')}>
                      Низкий
                    </Button>
                    <Button onClick={() => field.onChange('MEDIUM')}>
                      Средний
                    </Button>
                    <Button onClick={() => field.onChange('HIGH')}>
                      Высокий
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
                    <h1>Какие у вас имеются активы?</h1>
                    <div className='flex flex-col gap-8'>
                      <Button
                        className={
                          field.value?.includes('INVESTMENT')
                            ? `border-2 border-red-500`
                            : ``
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'INVESTMENT');
                        }}
                      >
                        Инвестиции
                      </Button>
                      <Button
                        className={
                          field.value?.includes('SAVINGS')
                            ? `border-2 border-red-500`
                            : ``
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'SAVINGS');
                        }}
                      >
                        Сбережения
                      </Button>
                      <Button
                        className={
                          field.value?.includes('PROPERTY')
                            ? `border-2 border-red-500`
                            : ``
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'PROPERTY');
                        }}
                      >
                        Собственность
                      </Button>
                      <Button
                        className={
                          field.value?.includes('BUSINESS')
                            ? `border-2 border-red-500`
                            : ``
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'BUSINESS');
                        }}
                      >
                        Бизнес
                      </Button>
                      <Button
                        className={
                          field.value?.includes('OTHER')
                            ? `border-2 border-red-500`
                            : ``
                        }
                        onClick={() => {
                          toggleAssets(field.value ?? [], 'OTHER');
                        }}
                      >
                        Другое
                      </Button>
                    </div>
                    <Button
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
