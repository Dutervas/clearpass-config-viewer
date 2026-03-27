import type { ParsedService } from "@/lib/parseXml";
import { StringList } from "@/components/StringList";
import { DataTable } from "@/components/DataTable";

export function AccountingTab({ data }: { data: ParsedService }) {
  return (
    <div className="space-y-6">
      <StringList title="Accounting Proxy Targets" items={data.acctProxyTargets} />
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground mb-2">
          RADIUS Attributes
        </h3>
        <DataTable
          columns={["Type", "Name", "Value"]}
          rows={data.acctFilterParams.map((p) => ({
            Type: p.type,
            Name: p.name,
            Value: p.value,
          }))}
        />
      </div>
    </div>
  );
}
