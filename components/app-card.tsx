import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppCardProps {
  app: {
    id: number;
    name: string;
    description: string;
    logo: string;
    lastModified: string;
    url?: string;
  };
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-[#d4dfe8] to-[#77AEDE] flex items-center justify-center">
          <div className="bg-white rounded-full p-1">
            <Image
              src={
                app.logo ||
                "https://experience-dev.becknprotocol.io/assets/open-spark.svg"
              }
              alt={`${app.name} logo`}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold">{app.name}</h3>
            <p className="text-sm text-muted-foreground">{app.description}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Last modified: {app.lastModified}
        </p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" asChild>
            <Link target="_blank" href={app.url}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={`/dashboard/configure/${app.id}`}>
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
