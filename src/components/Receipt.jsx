import React from "react";

export default function Receipt({ order, customer }) {
  const total = order
    .reduce((sum, item) => sum + item.price * (item.qty ?? item.quantity), 0)
    .toFixed(2);


    
  const handleWhatsApp = () => {
    const number = "11111111111"; // your WhatsApp number (no +)
    let message = `Payment Receipt\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nAddress: ${customer.address}, ${customer.city}, ${customer.zip}\n\nProducts:\n`;
    order.forEach((item) => {
      message += `${item.title} x${item.qty ?? item.quantity} - $${item.price.toFixed(2)}\n`;
    });
    message += `\nTotal: $${total}`;
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 text-gray-800 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Receipt</h2>
      {customer.paymentImage && (
        <img
          src={URL.createObjectURL(customer.paymentImage)}
          alt="Payment"
          className="w-28 h-28 mx-auto mb-4 rounded-lg object-contain"
        />
      )}
      <div className="text-left mb-4">
        <h3 className="font-semibold mb-1">Customer Details</h3>
        <p>{customer.name}</p>
        <p>{customer.email}</p>
        <p>{customer.address}, {customer.city}, {customer.zip}</p>
      </div>
      <div className="text-left mb-4">
        <h3 className="font-semibold mb-1">Products</h3>
        {order.map((item) => (
          <div key={item.id} className="flex justify-between mb-1">
            <span>{item.title} x{item.qty ?? item.quantity}</span>
            <span>${(item.price * (item.qty ?? item.quantity)).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-2 font-semibold text-right text-lg">
        Total: ${total}
      </div>
      <button
        onClick={handleWhatsApp}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Send via WhatsApp
      </button>

      <p>Send a Screenshot in WhatsApp as well of your Payment</p>
    </div>
  );
}
