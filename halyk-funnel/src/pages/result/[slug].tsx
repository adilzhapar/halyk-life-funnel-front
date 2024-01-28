import { getResult } from '@/lib/api/result';
import { ProductItemsOutputType } from '@/lib/forms/product';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const InsuranceResult = () => {
  const [attribution_id, setAttributionId] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductItemsOutputType>([]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.slug) {
      setAttributionId(router.query.slug as string);

      getResult(router.query.slug as string)
        .then((res) => {
          setProducts(res.recommended_products);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.isReady, attribution_id, router.query.slug]);

  if (loading) {
    <div className='flex-grow w-full flex justify-center items-center'>
      <CircularProgress />
      <p>loading</p>
    </div>;
  }
  console.log('products: ', products);
  return (
    <main className={`min-h-screen bg-[#f7f7f7]`}>
      <div className='max-w-[500px] mx-auto w-100 px-4 py-4 flex flex-col items-center text-center'>
        <h1 className='text-2xl font-bold text-[#182c14] text-center mb-2'>
          Продукты компании которые подходят{' '}
          <span className="text-center font-bold text-[#107c54]">
            вам
          </span>
        </h1>
        <p className='w-4/5 text-base font-medium text-[#6B7280] text-center mb-6'>уникальные цены расчитанные на базе ваших ответов</p>
        {products && products.map((item, index) => {
          return (
            <Card key={index} className='my-4'>
              <CardHeader>
                <CardTitle>{ item.product.title}</CardTitle>
                <CardDescription className='text-start'>{ item.product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-start'>Всего за <span className='text-center font-bold text-[#ecb13c]'>{Number(item.premium)}</span> тенге в месяц вы получаете страховое покрытие суммой в <span className='text-center font-bold text-[#107c54]'>~{ item.insurance_coverage } тенге</span></p>
                <p className='text-start'>на <span className='text-center font-bold text-[#107c54]'>{item.duration_in_years}</span> лет</p>
              </CardContent>
              <CardFooter className='flex justify-end'>
                <Button className='w-30 bg-[#107c54] hover:bg-[#107c54d2] text-[#fdfdfdde] text-lg font-bold h-10 py-0' onClick={ () => {router.push(item.product.link_to_product)}}>Перейти</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default InsuranceResult;
