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
      description: "Electric vehicle charging application",
      logo: "https://experience-dev.becknprotocol.io/assets/open-spark.svg",
      lastModified: "2 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
    },
    {
      id: 2,
      name: "EB Charging",
      description: "Energy management platform",
      logo: "https://experience-dev.becknprotocol.io/assets/open-spark.svg",
      lastModified: "5 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
    },
    {
      id: 3,
      name: "EB Charging",
      description: "Energy management platform",
      logo: "https://experience-dev.becknprotocol.io/assets/open-spark.svg",
      lastModified: "5 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
    },
    {
      id: 4,
      name: "EB Charging",
      description: "Energy management platform",
      logo: "https://experience-dev.becknprotocol.io/assets/open-spark.svg",
      lastModified: "5 days ago",
      url: "https://opensparkv2-dev.becknprotocol.io/",
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

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Apps</CardTitle>
            <CardDescription>Your reference applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{apps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Across all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Configurations</CardTitle>
            <CardDescription>Changes made this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
      </div> */}

      {/* <h2 className="text-2xl font-bold mt-6 mb-4">Your Applications</h2> */}
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
