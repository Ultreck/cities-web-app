"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormHook from "@/hooks/use-form-hook";
import { UseFormReturn } from "react-hook-form";
import CountryFlag from "@/lib/helper";
import { z } from "zod";
import { userSchemaProps } from "./IndividualRegistration";

const IndividualCountrySelect = ({form}:{form: UseFormReturn<userSchemaProps>}) => {
      const [selected, setSelected] = useState<string>("");
      const { countries } = useFormHook();
    
  return (
   <div className="space-y-2">
      <Select 
      value={selected} 
    //   onValueChange={setSelected}
     onValueChange={(value) => {
        const selectedValue = countries.find((c) => c.countryCode === value);
        setSelected(value);
        if (selectedValue) {
          form.setValue("country_code", `+${selectedValue.phonecode}`);
        }
      }}
      >
        <SelectTrigger className="w-[130px] py-5">
          {!selected && (
            <SelectValue className="text-xs" placeholder="country code" />
          )}
          {selected && (
            <div className="flex items-center gap-2">
              <CountryFlag
                code={
                  countries.find((c) => c.countryCode === selected)
                    ?.countryCode || ""
                }
                size="w-5 h-5"
              />
              <span>
                +{countries.find((c) => c.countryCode === selected)?.phonecode}
              </span>
            </div>
          )}
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country.countryCode} value={country.countryCode}>
              <button onClick={() => form.setValue("country_code", country.phonecode)} className="flex items-center gap-2">
                <CountryFlag code={country.countryCode} size="w-5 h-5" />
                <span>{country.name}</span>
                <span className="text-muted-foreground">
                  (+{country.phonecode})
                </span>
              </button>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default IndividualCountrySelect