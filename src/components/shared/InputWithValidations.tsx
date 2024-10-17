import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "./RequiredSymbol";
import { ClearButton } from "../ui/clear-button";
import { ErrorText } from "./ErrorText";
import { Input } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   name: string;
   label?: string;
   required?: boolean;
   className?: string;
   icon?: React.ReactNode;
}

export const InputWithValidations: React.FC<Props> = ({
   className,
   name,
   label,
   required,
   icon,
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
            <Input
               iconHidden={false}
               icon={icon}
               className="h-12 text-md"
               {...register(name)}
               {...props}
            />

            {value && <ClearButton onClick={onClickClear} />}
         </div>

         {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
   );
};
