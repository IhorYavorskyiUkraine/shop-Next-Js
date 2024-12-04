interface Props {
   number: string;
   text: string;
}

export const NumberTable: React.FC<Props> = ({ number, text }) => {
   return (
      <div className="flex flex-col">
         <span className="font-satoshi-b text-xl font-bold leading-32 md:text-4xl md:leading-[54px]">
            {number}+
         </span>
         <span className="text-xs leading-22 opacity-60 md:text-md">
            {text}
         </span>
      </div>
   );
};
