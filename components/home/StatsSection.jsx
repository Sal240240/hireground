import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function StatsSection({ stats }) {
  const statCards = [
    {
      title: "Active Jobs",
      value: stats.jobs,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Contractors",
      value: stats.contractors,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Growth Rate",
      value: "150%",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
