import type { ParsedService } from "@/lib/parseXml";
import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";

export function ServiceTab({ data }: { data: ParsedService }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">General</h3>
        <FieldRow label="Name" value={data.name} />
        <FieldRow label="Description" value={data.description} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Service Rules</h3>
        <DataTable
          columns={["Type", "Name", "Operator", "Value"]}
          rows={data.serviceRules.map((r) => ({
            Type: r.type,
            Name: r.name,
            Operator: r.operator,
            Value: r.value,
          }))}
        />
      </div>
    </div>
  );
}
