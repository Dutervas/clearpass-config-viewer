import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";
import type { ParsedService } from "@/lib/parseXml";

export function RolesTab({ data }: { data: ParsedService }) {
  // Tratamento para quando o XML não tiver Role Mapping (ex: segundo XML enviado)
  if (!data.roleMapping) {
    return (
      <div className="p-6 bg-card border border-border rounded text-center">
        <p className="text-muted-foreground italic">No Role Mapping Policy configured for this service.</p>
      </div>
    );
  }

  const tableRows = data.roleMapping.rules.map(rule => ({
    "Conditions": rule.conditions,
    "Role": rule.role
  }));

  return (
    <div className="space-y-6">
      
      <div className="border border-border rounded p-4 space-y-2 bg-card text-sm mt-4">
        <div className="bg-muted -mx-4 -mt-4 p-2 border-b border-border mb-4 text-center font-semibold text-secondary-foreground">
          Role Mapping Policy Details
        </div>
        <FieldRow label="Role Mapping Policy" value={data.roleMapping.name} />
        <FieldRow label="Default Role" value={data.roleMapping.defaultRole} />
        <FieldRow label="Rules Evaluation Algorithm" value={data.roleMapping.evalAlgorithm} />
      </div>

      <DataTable
        columns={["Conditions", "Role"]}
        rows={tableRows}
        emptyMessage="No role mapping rules configured."
      />
    </div>
  );
}