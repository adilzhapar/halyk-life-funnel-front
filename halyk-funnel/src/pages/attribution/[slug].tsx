import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress";
import { patchAttribution } from "@/lib/api/patchAttribution";
import { UpdateAttributionInput, UpdateAttributionInputType } from "@/lib/forms/attribution";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    watch,
    formState: { errors },
    control,
    resetField,
  } = methods;

  useEffect(()=>{
    if(!router.isReady) return;

    setAttributionId(router.query.slug as string);

}, [router.isReady, attribution_id, router]);

  const onChange = async (target: HTMLInputElement | CustomEventTarget) => {
    const key = target.name.replace('properties.', '');
    console.log('onChange event values: ', { [key]: target.value })
    await patchAttribution({ attribution_id, properties: { [key]: target.value } });
    setStep((prev) => prev + 1);
  }

  const onSubmit = async (data: UpdateAttributionInputType) => {
    console.log('update called', data);
  }
  
  return (
    <main className={`min-h-screen bg-[#f7f7f7]`}>
      <div className='max-w-[500px] mx-auto w-96 px-4 py-4 flex flex-col items-center'>
        <Progress value={step * 12.5} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {
            step === 0 && (
              <>
                <ArrowBackIosNew
                  onClick={() => {
                    router.push('/');
                  }}
                />
                <h1>info about insurance</h1>
                <Button onClick={() => setStep((prev) => prev + 1)}>Продолжить</Button>
              </>
          )
        }
        {
          step === 1 && (
            <FormField
                control={control}
                {...register('properties.income_level', {
                  onChange: (e) => { onChange(e.target)}
                })}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1>Укажите текущий уровень дохода</h1>
                    <div className="flex flex-col gap-8">
                      <Button onClick={() => field.onChange('LOW')}>Ниже среднего</Button>
                      <Button onClick={() => field.onChange('MEDIUM')}>Средний</Button>
                      <Button onClick={() => field.onChange('HIGH')}>Выше среднего</Button>
                    </div>
                  </div>
                )}
            />
          )
          }
          {
            step === 2 && (
              <FormField
                control={control}
                {...register('properties.is_married', {
                  onChange: (e) => { onChange(e.target)}
                })}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1>Состоите ли вы в браке?</h1>
                    <div className="flex flex-col gap-8">
                      <Button onClick={() => field.onChange(true)}>Да</Button>
                      <Button onClick={() => field.onChange(false)}>Нет</Button>
                    </div>
                  </div>
                )}
            />
            )
          }
          {
            step === 3 && (
              <FormField
                control={control}
                {...register('properties.number_of_dependants')}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1>Сколько человек зависит от вашего дохода</h1>
                    <Input onChange={field.onChange} type="number" />
                    <Button onClick={() => onChange({name: field.name, value: field.value} as CustomEventTarget)}>Дальше</Button></div>
                )}
            />
            )
          }
          {
            step === 4 && (
              <FormField
                control={control}
                {...register('properties.health_status', {
                  onChange: (e) => { onChange(e.target)}
                })}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1>Как бы вы оценили состояние вашего здоровья</h1>
                    <div className="flex flex-col gap-8">
                      <Button onClick={() => field.onChange("BAD")}>Нужно лечение</Button>
                      <Button onClick={() => field.onChange("GOOD")}>Не жалуюсь</Button>
                      <Button onClick={() => field.onChange("EXCELLENT")}>Полностью здоров</Button>
                    </div>
                  </div>
                )}
            />
            )
          }
          {
            step === 5 && (
              <FormField
              control={control}
              {...register('properties.financial_goals', {
                onChange: (e) => { onChange(e.target)}
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1>Какие у вас финансовые ценности?</h1>
                  <div className="flex flex-col gap-8">
                    <Button onClick={() => field.onChange("DEBT_PAYMENT")}>Закрыть долги</Button>
                    <Button onClick={() => field.onChange("CHILDREN_EDUCATION")}>Оплатить обучение детей</Button>
                    <Button onClick={() => field.onChange("MORTGAGE_PROTECTION")}>Защита от ипотеки</Button>
                    <Button onClick={() => field.onChange("INCOME_REPLACEMENT")}>Пассивный доход</Button>
                  </div>
                </div>
              )}
              />
            )
          }
          {
            step === 6 && (
              <FormField
              control={control}
              {...register('properties.debt_level', {
                onChange: (e) => { onChange(e.target)}
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1>Уровень долга</h1>
                  <div className="flex flex-col gap-8">
                    <Button onClick={() => field.onChange("LOW")}>Низкий</Button>
                    <Button onClick={() => field.onChange("MEDIUM")}>Средний</Button>
                    <Button onClick={() => field.onChange("HIGH")}>Высокий</Button>
                  </div>
                </div>
              )}
              />
            )
          }
          {
            step === 7 && (
              <FormField
              control={control}
              {...register('properties.last_injurance_time', {
                onChange: (e) => { onChange(e.target)}
              })}
              render={({ field }) => (
                <div className='flex flex-col gap-8'>
                  <h1>Когда последний раз получали травму?</h1>
                  <div className="flex flex-col gap-8">
                    <Button onClick={() => field.onChange("THIS_MONTH")}>В этом месяце</Button>
                    <Button onClick={() => field.onChange("LAST_MONTH")}>В прошлом месяце</Button>
                    <Button onClick={() => field.onChange("THIS_YEAR")}>В этом году</Button>
                    <Button onClick={() => field.onChange("MORE_THAN_YEAR")}>Больше года назад</Button>
                  </div>
                </div>
              )}
              />
            )
          }
          {
            step === 8 && (
              <>
                <FormField
                control={control}
                {...register('properties.assets', {
                  onChange: (e) => { onChange(e.target)}
                })}
                render={({ field }) => (
                  <div className='flex flex-col gap-8'>
                    <h1>Какие у вас имеются активы?</h1>
                    <div className="flex flex-col gap-8">
                      <Button onClick={() => field.onChange("INVESTMENT")}>Инвестиции</Button>
                      <Button onClick={() => field.onChange("SAVINGS")}>Сбережения</Button>
                      <Button onClick={() => field.onChange("PROPERTY")}>Собственность</Button>
                      <Button onClick={() => field.onChange("BUSINESS")}>Бизнес</Button>
                      <Button onClick={() => field.onChange("OTHER")}>Другое</Button>
                    </div>
                  </div>
                )}
                />
                <Button>Узнать предлагаемую сумму</Button>
              </>
            )
          }
        </form>
      </div>
    </main>
  )
}

export default AttributionSteps;