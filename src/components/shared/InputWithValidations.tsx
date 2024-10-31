import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "./RequiredSymbol";
import { ClearButton } from "../ui/clear-button";
import { ErrorText } from "./ErrorText";
import { Input } from "../ui/input";
import InputMask from "react-input-mask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   required?: boolean;
   className?: string;
   icon?: React.ReactNode;
   phoneMask?: boolean;
   clearBtn?: boolean;
}

export const InputWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   required,
   icon,
   phoneMask = false,
   clearBtn,
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
         {label && (
            <p className="mb-1 font-medium">
               {label} {required && <RequiredSymbol />}
            </p>
         )}
         <div className="relative">
            {phoneMask ? (
               <div className="flex items-center rounded-full bg-gray px-4 py-3 md:flex">
                  {icon && <div className="flex items-center">{icon}</div>}
                  <InputMask
                     mask="+380 (99) 999-99-99"
                     placeholder="+380 (__) ___-__-__"
                     className="placeholder:text-muted-foreground flex h-5 w-full rounded-md bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:leading-19 placeholder:text-black/40 focus:border-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-[22px] md:placeholder:text-md md:placeholder:leading-22"
                     {...register(name)}
                     {...props}
                  />
               </div>
            ) : (
               <Input
                  iconHidden={false}
                  icon={icon}
                  clearBtn
                  className="h-12 text-md"
                  {...register(name)}
                  {...props}
               />
            )}

            {clearBtn ? null : value && <ClearButton onClick={onClickClear} />}
         </div>

         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
