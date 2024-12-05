export const getDataReview = (createdAt: Date) => {
   const date = new Date(createdAt);

   if (isNaN(date.getTime())) {
      return "Invalid Date";
   }

   const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   const formattedDate = date.toLocaleDateString("en-US", options);

   return `Posted on ${formattedDate}`;
};
