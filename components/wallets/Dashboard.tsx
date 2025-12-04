"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  Wifi,
  Eye,
  EyeOff,
  Settings,
  Bell,
  User,
} from "lucide-react";
import { useState } from "react";
import { usePayment } from "./PaymentContext";
import { PaymentFlow } from "./PaymentFlow";
import Link from "next/link";

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const { payment, updatePayment } = usePayment();

  const handlePaymentType = (
    type: "transfer" | "outbound" | "inbound" | "airtime" | "data"
  ) => {
    console.log(type);
    
    // updatePayment({ type, step: 0 });
  };

  const handleClosePayment = () => {
    updatePayment({ type: null, step: 0 });
  };

  const handlePaymentSuccess = () => {
    // Success is handled in PaymentFlow component
  };

  console.log(payment);

  return (
    <div className="min-h-screen w-full mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hello David 👋
          </h2>
          <p className="text-gray-600">Welcome back to your wallet</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0 text-white mb-8 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-bold">
                    {showBalance ? "₦2,034,000" : "••••••"}
                  </h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Card Number</p>
                <p className="text-lg font-mono">•••• •••• •••• 2024</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-100 text-xs mb-1">Total Transfers</p>
                <p className="text-lg font-semibold">206</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs mb-1">Interest Earned</p>
                <p className="text-lg font-semibold">₦10,500</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs mb-1">Last Deposit</p>
                <p className="text-lg font-semibold">01/26/2022</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs mb-1">Wallet Balance</p>
                <p className="text-lg font-semibold">₦2,323,343</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Link className="w-full" href={`/n/wallets/transfers`}>
            <Button
              onClick={() => handlePaymentType("transfer")}
              className="h-24 w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
            >
              <Send size={28} className="text-blue-600" />
              <span className="font-semibold">Transfer</span>
            </Button>
          </Link>

          <Link className="w-full" href={`/n/wallets/outbounds`}>
            <Button
              onClick={() => handlePaymentType("outbound")}
              className="h-24 w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
            >
              <ArrowUpRight size={28} className="text-orange-500" />
              <span className="font-semibold">Outbound</span>
            </Button>
          </Link>
          <Link className="w-full" href={`/n/wallets/inbounds`}>
            <Button
              onClick={() => handlePaymentType("inbound")}
              className="h-24 w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
            >
              <ArrowDownLeft size={28} className="text-green-600" />
              <span className="font-semibold">Inbound</span>
            </Button>
          </Link>
          <Link className="w-full" href={`/n/wallets/airtimes`}>
            <Button
              onClick={() => handlePaymentType("airtime")}
              className="h-24 w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
            >
              <Smartphone size={28} className="text-purple-600" />
              <span className="font-semibold">Airtime</span>
            </Button>
          </Link>
          <Link className="w-full" href={`/n/wallets/datas`}>
            <Button
              onClick={() => handlePaymentType("data")}
              className="h-24 w-full bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900 flex flex-col items-center justify-center gap-2 rounded-xl transition"
            >
              <Wifi size={28} className="text-cyan-600" />
              <span className="font-semibold">Data</span>
            </Button>
          </Link>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Transactions
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              {
                name: "John Doe",
                amount: "-₦5,000",
                date: "Today",
                type: "sent",
              },
              {
                name: "Airtime Purchase",
                amount: "-₦1,000",
                date: "Yesterday",
                type: "airtime",
              },
              {
                name: "Salary Deposit",
                amount: "+₦50,000",
                date: "2 days ago",
                type: "received",
              },
              {
                name: "Data Purchase",
                amount: "-₦2,500",
                date: "3 days ago",
                type: "data",
              },
            ].map((tx, i) => (
              <div
                key={i}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "sent"
                        ? "bg-red-100"
                        : tx.type === "received"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {tx.type === "sent" ? (
                      <ArrowUpRight
                        size={20}
                        className={
                          tx.type === "sent"
                            ? "text-red-600"
                            : tx.type === "received"
                            ? "text-green-600"
                            : "text-blue-600"
                        }
                      />
                    ) : (
                      <ArrowDownLeft
                        size={20}
                        className={
                          tx.type === "received"
                            ? "text-green-600"
                            : "text-blue-600"
                        }
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tx.name}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "sent"
                      ? "text-red-600"
                      : tx.type === "received"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Payment Flow Modal */}
      {payment.type && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <PaymentFlow
              onClose={handleClosePayment}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
