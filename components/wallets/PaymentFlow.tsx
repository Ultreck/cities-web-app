'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { usePayment } from "./PaymentContext";

const contacts = [
  { id: 1, name: "Adekunle Tunde", avatar: "AT", color: "bg-blue-500" },
  { id: 2, name: "Chioma Okafor", avatar: "CO", color: "bg-purple-500" },
  { id: 3, name: "Ibrahim Hassan", avatar: "IH", color: "bg-green-500" },
  { id: 4, name: "Zainab Malik", avatar: "ZM", color: "bg-pink-500" },
  { id: 5, name: "Emeka Nwosu", avatar: "EN", color: "bg-orange-500" },
  { id: 6, name: "Fatima Ahmed", avatar: "FA", color: "bg-red-500" },
];

const banks = [
  { id: 1, name: "Guarantee Trust Bank", code: "GTB" },
  { id: 2, name: "First Bank of Nigeria", code: "FBN" },
  { id: 3, name: "Access Bank", code: "ACB" },
  { id: 4, name: "Zenith Bank", code: "ZB" },
  { id: 5, name: "United Bank for Africa", code: "UBA" },
  { id: 6, name: "FCMB", code: "FCMB" },
];

const providers = [
  { id: 1, name: "MTN", logo: "🟡", color: "bg-yellow-500" },
  { id: 2, name: "Airtel", logo: "🔴", color: "bg-red-500" },
  { id: 3, name: "Glo", logo: "🟢", color: "bg-green-500" },
  { id: 4, name: "9Mobile", logo: "🟣", color: "bg-purple-500" },
];

const airtimePlans = [
  { amount: 100, price: 100 },
  { amount: 200, price: 200 },
  { amount: 500, price: 500 },
  { amount: 1000, price: 1000 },
  { amount: 2000, price: 2000 },
  { amount: 5000, price: 5000 },
];

// const dataPlans = [
//   { amount: 500, data: "500MB", validity: "7 days" },
//   { amount: 1000, data: "1GB", validity: "7 days" },
//   { amount: 2000, data: "2GB", validity: "30 days" },
//   { amount: 5000, data: "5GB", validity: "30 days" },
//   { amount: 10000, data: "10GB", validity: "30 days" },
//   { amount: 20000, data: "20GB", validity: "30 days" },
// ];

const sources = [
  { id: 1, name: "@draddo", icon: "👤" },
  { id: 2, name: "Salary (Employer credit)", icon: "💼" },
  { id: 3, name: "Freelance Income", icon: "💻" },
  { id: 4, name: "Investment Returns", icon: "📈" },
];

interface PaymentFlowProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export function PaymentFlow({ onClose, onSuccess }: PaymentFlowProps) {
  const { payment, updatePayment, nextStep, prevStep, resetPayment } =
    usePayment();
  const [copied, setCopied] = useState(false);

  if (!payment.type) return null;

  // const getTitle = () => {
  //   switch (payment.type) {
  //     case "transfer":
  //       return "Transfer to Contact";
  //     case "outbound":
  //       return "Outbound Transfer";
  //     case "inbound":
  //       return "Receive Money";
  //     case "airtime":
  //       return "Buy Airtime";
  //     case "data":
  //       return "Buy Data";
  //     default:
  //       return "Payment";
  //   }
  // };

  const getStepCount = () => {
    if (payment.type === "inbound") return 2;
    return 3;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("0040012023");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const handleSuccess = () => {
  //   updatePayment({ step: getStepCount() });
  //   setTimeout(() => {
  //     onSuccess();
  //     resetPayment();
  //   }, 1500);
  // };

  const renderStep = () => {
    // TRANSFER FLOW
    if (payment.type === "transfer") {
      if (payment.step === 0) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select a Contact
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    updatePayment({ recipient: contact.name });
                    nextStep();
                  }}
                  className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                    payment.recipient === contact.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {contact.avatar}
                  </div>
                  <p className="text-xs font-semibold text-gray-900 text-center">
                    {contact.name.split(" ")[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (payment.step === 1) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Transfer Details
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Recipient
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900">
                  {payment.recipient}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Amount (₦)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={payment.amount || ""}
                onChange={(e) => updatePayment({ amount: e.target.value })}
                className="h-11 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description (Optional)
              </label>
              <Input
                placeholder="What is this transfer for?"
                value={payment.description || ""}
                onChange={(e) => updatePayment({ description: e.target.value })}
                className="h-11 border-gray-300"
              />
            </div>
          </div>
        );
      } else if (payment.step === 2) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Transfer
            </h3>
            <Card className="bg-blue-50 border-blue-200 p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-600">Recipient</span>
                  <span className="font-semibold text-blue-900">
                    {payment.recipient}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Amount</span>
                  <span className="font-semibold text-blue-900">
                    ₦{payment.amount}
                  </span>
                </div>
                {payment.description && (
                  <div className="flex justify-between">
                    <span className="text-blue-600">Description</span>
                    <span className="font-semibold text-blue-900">
                      {payment.description}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      }
    }

    // OUTBOUND TRANSFER FLOW
    if (payment.type === "outbound") {
      if (payment.step === 0) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Bank
            </h3>
            <Select
              value={payment.bank || ""}
              onValueChange={(value) => {
                updatePayment({ bank: value });
                nextStep();
              }}
            >
              <SelectTrigger className="h-11 border-gray-300">
                <SelectValue placeholder="Choose a bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.name}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      } else if (payment.step === 1) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Details
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Bank
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900">{payment.bank}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Account Number
              </label>
              <Input
                type="text"
                placeholder="Enter account number"
                value={payment.accountNumber || ""}
                onChange={(e) =>
                  updatePayment({ accountNumber: e.target.value })
                }
                className="h-11 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Amount (₦)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={payment.amount || ""}
                onChange={(e) => updatePayment({ amount: e.target.value })}
                className="h-11 border-gray-300"
              />
            </div>
          </div>
        );
      } else if (payment.step === 2) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Transfer
            </h3>
            <Card className="bg-blue-50 border-blue-200 p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-600">Bank</span>
                  <span className="font-semibold text-blue-900">
                    {payment.bank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Account</span>
                  <span className="font-mono text-sm font-semibold text-blue-900">
                    {payment.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Amount</span>
                  <span className="font-semibold text-blue-900">
                    ₦{payment.amount}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        );
      }
    }

    // INBOUND TRANSFER FLOW
    if (payment.type === "inbound") {
      if (payment.step === 0) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Your Account Details
            </h3>
            <Card className="bg-green-50 border-green-200 p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-600 mb-1">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold font-mono">0040012023</p>
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-white/50 rounded-lg transition"
                    >
                      {copied ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} className="text-green-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-green-600 mb-1">Bank Name</p>
                  <p className="font-semibold text-green-900">
                    Guarantee Trust Bank
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-600 mb-1">Account Name</p>
                  <p className="font-semibold text-green-900">David Okafor</p>
                </div>
              </div>
            </Card>
          </div>
        );
      } else if (payment.step === 1) {
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Transfer Source
            </h3>
            <Select
              value={payment.source || ""}
              onValueChange={(value) => updatePayment({ source: value })}
            >
              <SelectTrigger className="h-11 border-gray-300">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source.id} value={source.name}>
                    <span className="flex items-center gap-2">
                      <span>{source.icon}</span>
                      {source.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {payment.source && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  ✓ Share your account details with the sender to complete the
                  transfer.
                </p>
              </div>
            )}
          </div>
        );
      }
    }

    // AIRTIME FLOW
    // AIRTIME FLOW
    if (payment.type === "airtime") {
      if (payment.step === 0) {
        // STEP 0: Select Provider
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Provider
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    updatePayment({ provider: provider.name });
                    nextStep();
                  }}
                  className={`p-4 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                    payment.provider === provider.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${provider.color} flex items-center justify-center text-2xl`}
                  >
                    {provider.logo}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {provider.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (payment.step === 1) {
        // STEP 1: Enter Number & Select Amount
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Phone Number
            </h3>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={payment.phoneNumber || ""}
              onChange={(e) => updatePayment({ phoneNumber: e.target.value })}
              className="h-11 border-gray-300 mb-4"
            />

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Select Amount
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {airtimePlans.map((plan) => (
                <button
                  key={plan.amount}
                  onClick={() =>
                    updatePayment({ plan: plan.amount.toString() })
                  }
                  className={`p-3 rounded-lg border-2 transition font-semibold text-sm ${
                    payment.plan === plan.amount.toString()
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-blue-300 bg-white text-gray-900"
                  }`}
                >
                  ₦{plan.amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!payment.phoneNumber || !payment.plan}
                className={`px-4 py-2 rounded-lg font-medium ${
                  payment.phoneNumber && payment.plan
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        );
      } else if (payment.step === 2) {
        // STEP 2: Confirm Purchase
        return (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Purchase
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between text-sm text-gray-700">
                <span>Provider:</span>
                <span className="font-semibold">{payment.provider}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Phone Number:</span>
                <span className="font-semibold">{payment.phoneNumber}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Amount:</span>
                <span className="font-semibold">
                  ₦{Number(payment.plan).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
              >
                Back
              </button>
              <button
                onClick={() => alert("Airtime purchase successful! 🎉")}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        );
      }
    }
  };
}
