"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CountryProvidersListProps {
  providers: any;
}

const CountryProvidersList: React.FC<CountryProvidersListProps> = ({
  providers,
}) => {
  const [country, setCountry] = useState<string>("GB");

  return (
    <div className='flex flex-col px-12 '>
      <div className='w-full flex justify-start gap-4 items-center'>
        <h1 className='text-xl '>Where to watch?</h1>
        <Select
          defaultValue={country}
          onValueChange={(value: string) => setCountry(value)}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(providers).map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-1 flex-wrap gap-4 xl:gap-8 justify-start w-full '>
        {providers[country]?.flatrate && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Stream</h1>
            <div className='flex flex-1 flex-wrap gap-4'>
              {providers[country]?.flatrate.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}
        {providers[country]?.rent && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Rent</h1>
            <div className='flex gap-4 flex-1 flex-wrap'>
              {providers[country]?.rent.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}

        {providers[country]?.buy && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Buy</h1>
            <div className='flex gap-4 flex-1 flex-wrap'>
              {providers[country]?.buy.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryProvidersList;
