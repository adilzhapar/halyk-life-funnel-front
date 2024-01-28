import { getResult } from "@/lib/api/result";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InsuranceResult = () => {
  const [attribution_id, setAttributionId] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.slug) {
      setAttributionId(router.query.slug as string);
      
      getResult(router.query.slug as string).then((res) => {
        setResult(res);
        setLoading(false);
      })
    }

  }, [router.isReady, attribution_id, router.query.slug]);

  if (loading) {
    <div className="flex-grow w-full flex justify-center items-center">
      <CircularProgress />
      <p>loading</p>
    </div>
  }

  return (
    <></>
  );
}

export default InsuranceResult;