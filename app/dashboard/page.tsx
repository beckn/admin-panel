import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppCard } from "@/components/app-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  // Sample reference applications
  const apps = [
    {
      id: 1,
      name: "Spark App",
      description: "A platform for managing and locating EV charging stations.",
      logo: "https://opensparkv2-dev.becknprotocol.io/images/Spark.svg",
      lastModified: "2 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
    },
    {
      id: 2,
      name: "EV Charging",
      description:
        "A comprehensive energy management and EV charging interface.",
      logo: "https://experience-dev.becknprotocol.io/assets/open-spark.svg",
      lastModified: "5 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
    },
    {
      id: 3,
      name: "Wallet",
      description:
        "A secure digital wallet for managing EV credits and transactions.",
      logo: "https://unified-wallet-dev.becknprotocol.io/images/app_name.svg",
      lastModified: "5 days ago",
      url: "https://unified-wallet-dev.becknprotocol.io/",
    },
    {
      id: 4,
      name: "Finance",
      description:
        "A financial dashboard for monitoring usage, billing, and reports.",
      logo: "https://experience-dev.becknprotocol.io/assets/money_bag.svg",
      lastModified: "5 days ago",
      url: "https://lendease-dev.becknprotocol.io/",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Experience Center Dashboard
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New App
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
