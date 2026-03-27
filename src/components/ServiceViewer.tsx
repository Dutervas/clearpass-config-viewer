import { useState } from "react";
import type { ParsedService } from "@/lib/parseXml";
import { ServiceTab } from "./tabs/ServiceTab";
import { AuthenticationTab } from "./tabs/AuthenticationTab";
import { AuthorizationTab } from "./tabs/AuthorizationTab";
import { RolesTab } from "./tabs/RolesTab";
import { EnforcementTab } from "./tabs/EnforcementTab";
import { AccountingTab } from "./tabs/AccountingTab";
import { Printer, RotateCcw } from "lucide-react";

const TABS = [
  "Service",
  "Authentication",
  "Authorization",
  "Roles",
  "Enforcement",
  "Accounting Proxy",
] as const;

type Tab = (typeof TABS)[number];

interface ServiceViewerProps {
  data: ParsedService;
  onReset: () => void;
}

function TabContent({ tab, data }: { tab: Tab; data: ParsedService }) {
  switch (tab) {
    case "Service": return <ServiceTab data={data} />;
    case "Authentication": return <AuthenticationTab data={data} />;
    case "Authorization": return <AuthorizationTab data={data} />;
    case "Roles": return <RolesTab data={data} />;
    case "Enforcement": return <EnforcementTab data={data} />;
    case "Accounting Proxy": return <AccountingTab data={data} />;
  }
}

export function ServiceViewer({ data, onReset }: ServiceViewerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Service");

  const handlePrint = () => window.print();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{data.name}</h1>
          {data.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Printer className="h-4 w-4" /> Print to PDF
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      {/* Tabs - interactive (hidden on print) */}
      <div className="no-print">
        <div className="flex border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <TabContent tab={activeTab} data={data} />
        </div>
      </div>

      {/* Print layout - all tabs linear */}
      <div className="hidden print-visible">
        {TABS.map((tab, i) => (
          <div key={tab} className={i > 0 ? "print-break" : ""}>
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2 mb-4">
              {tab}
            </h2>
            <TabContent tab={tab} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}
