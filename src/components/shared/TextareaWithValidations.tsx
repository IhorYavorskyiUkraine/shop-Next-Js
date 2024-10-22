import { ClearButton } from "@/components/ui/clear-button";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "./ErrorText";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   name: string;
   label?: string;
   className?: string;
}

export const TextareaWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   ...props
}) => {
   const {
      register,
      formState: { errors },
      watch,
      setValue,
   } = useFormContext();

   const value = watch(name);
   const errorText = errors[name]?.message as string;

   const onClickClear = () => {
      setValue(name, "", { shouldValidate: true });
   };
   return (
      <div className={className}>
         {label && <p className="mb-1 font-medium">{label}</p>}

         <div className="relative">
            <textarea
               className="rounded-m !h-[132px] w-full resize-none rounded-[20px] bg-gray px-3 py-2 text-md focus:outline-none"
               {...register(name)}
               {...props}
            />

            {value && <ClearButton onClick={onClickClear} />}
         </div>

         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
