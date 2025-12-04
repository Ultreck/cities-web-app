'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function Airtime() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handlePurchase = () => {
    if (selectedProvider && phoneNumber && selectedPlan !== null) {
      router.push("/n/wallets/success");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Buy Airtime</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Select Provider */}
        <Card className="bg-white mb-8">
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Select Provider
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id.toString())}
                  className={`p-6 rounded-xl border-2 transition flex flex-col items-center justify-center gap-3 ${
                    selectedProvider === provider.id.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full ${provider.color} flex items-center justify-center text-3xl`}
                  >
                    {provider.logo}
                  </div>
                  <p className="font-semibold text-gray-900">{provider.name}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Phone Number */}
        {selectedProvider && (
          <Card className="bg-white mb-8">
            <div className="p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Phone Number
              </h2>

              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12 border-gray-300 mb-6"
              />

              {/* Select Plan */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Select Amount
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {airtimePlans.map((plan) => (
                  <button
                    key={plan.amount}
                    onClick={() => setSelectedPlan(plan.amount)}
                    className={`p-4 rounded-lg border-2 transition font-semibold ${
                      selectedPlan === plan.amount
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-200 hover:border-blue-300 bg-white text-gray-900"
                    }`}
                  >
                    ₦{plan.amount}
                  </button>
                ))}
              </div>

              {/* Summary */}
              {selectedPlan && (
                <Card className="bg-blue-50 border-blue-200 p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-600">Provider</p>
                      <p className="font-bold text-blue-900">
                        {providers.find((p) => p.id.toString() === selectedProvider)
                          ?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Amount</p>
                      <p className="font-bold text-blue-900">₦{selectedPlan}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex-1 h-12 border-gray-300 text-gray-900"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePurchase}
                  disabled={!selectedProvider || !phoneNumber || selectedPlan === null}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  Buy Airtime
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

