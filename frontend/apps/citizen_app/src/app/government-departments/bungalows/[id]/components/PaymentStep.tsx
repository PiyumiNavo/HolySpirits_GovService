import Image from "next/image";
import { Heading, Select, InputField } from "@myorg/ui";
import type { PaymentDetails, Bungalow } from "../types";

interface PaymentStepProps {
  bungalow: Bungalow;
  paymentDetails: PaymentDetails;
  totalPrice: number;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
}

export function PaymentStep({
  bungalow,
  paymentDetails,
  totalPrice,
  onPaymentDetailsChange
}: PaymentStepProps) {
  const handleChange = (field: keyof PaymentDetails, value: string) => {
    onPaymentDetailsChange({
      ...paymentDetails,
      [field]: value
    });
  };

  return (
    <div className="space-y-3">
      {/* Property Header for Payment */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
            <Image
              src={bungalow.image}
              alt={bungalow.name}
              width={40}
              height={40}
              className="rounded object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600">{bungalow.department}</p>
            <h3 className="text-sm font-semibold text-gray-900">{bungalow.name}</h3>
            <p className="text-xs text-gray-600">{bungalow.location}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Heading level={2} size="md" className="mb-1">Payment</Heading>
        <p className="text-gray-600 text-sm mb-3">Please complete the payment within 15 minutes</p>
      </div>

      {/* Total Bill */}
      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Bill</span>
          <div className="bg-blue-100 px-3 py-1 rounded">
            <span className="text-base font-bold text-blue-900">LKR {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Payment Method*</span>
          <div className="w-1/2">
            <Select
              id="paymentMethod"
              label=""
              value={paymentDetails.method}
              onChange={(value) => handleChange('method', value)}
              options={[
                { value: '', label: 'Choose payment method' },
                { value: 'card', label: 'Credit / Debit Card' },
                { value: 'mobile', label: 'Mobile Payments' }
              ]}
            />
          </div>
        </div>

        {paymentDetails.method === 'card' && (
          <div className="mt-3 space-y-2">
            <InputField
              id="cardName"
              label="Name on card*"
              type="text"
              value={paymentDetails.cardName}
              onChange={(e) => handleChange('cardName', e.target.value)}
              placeholder="Enter name on card"
              required={true}
            />
            
            <InputField
              id="cardNumber"
              label="Card No*"
              type="text"
              value={paymentDetails.cardNumber}
              onChange={(e) => handleChange('cardNumber', e.target.value)}
              placeholder="Enter card number"
              required={true}
            />

            <div className="grid grid-cols-2 gap-2">
              <InputField
                id="expiry"
                label="Expiry*"
                type="text"
                value={paymentDetails.expiry}
                onChange={(e) => handleChange('expiry', e.target.value)}
                placeholder="MM/YY"
                required={true}
              />
              
              <InputField
                id="cvc"
                label="CVC*"
                type="text"
                value={paymentDetails.cvc}
                onChange={(e) => handleChange('cvc', e.target.value)}
                placeholder="xxx"
                required={true}
              />
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-900">Terms and Conditions.</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Refunds that will be made due to service not delivered/cancelled, will be made to original credit/debit card.</li>
          <li>• All the payment related information will be collected and kept with the relevant banks.</li>
        </ul>
        
        <div className="flex items-center space-x-2 mt-3">
          <input 
            type="checkbox" 
            id="acceptTerms"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="acceptTerms" className="font-medium text-sm text-gray-700">I ACCEPT</label>
        </div>
      </div>
    </div>
  );
}
