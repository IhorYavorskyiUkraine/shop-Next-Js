interface EmailTemplateProps {
   firstName: string;
   orderId: number;
   orderTotal: number;
   paymentLink: string;
}

export const PayOrderTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
   firstName,
   orderId,
   orderTotal,
   paymentLink,
}) => (
   <div className="text-gray-800 bg-white p-6 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold text-green-600">
         Thank you for your order, {firstName}!
      </h1>
      <p className="mt-4">
         We appreciate your purchase. Your order
         <span className="font-semibold">#{orderId}</span> is almost complete.
      </p>
      <p className="mt-2">
         <span className="font-semibold">Order Total: </span>${orderTotal}
      </p>
      <p className="mt-4">
         Please complete your payment by clicking the button below:
      </p>
      <a
         href={paymentLink}
         className="mt-4 inline-block rounded-md bg-green-600 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-green-500"
      >
         Pay Now
      </a>
      <p className="mt-6">
         If you have any questions, feel free to contact our support team.
      </p>
      <p className="mt-4">Best regards,</p>
      <p>SHOP.CO</p>
   </div>
);
