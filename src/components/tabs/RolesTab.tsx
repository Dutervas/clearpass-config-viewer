import type { ParsedService } from "@/lib/parseXml";
import { FieldRow } from "@/components/FieldRow";
import { DataTable } from "@/components/DataTable";

export function RolesTab({ data }: { data: ParsedService }) {
  const rm = data.roleMapping;
  return (
    <div className="space-y-6">
      <FieldRow label="Role Mapping Policy" value={data.roleMappingName} />
      {rm ? (
        <>
          <FieldRow label="Default Role" value={rm.defaultRole} />
          <FieldRow label="Evaluation Algorithm" value={rm.evalAlgorithm} />
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">Rules</h3>
            <DataTable
              columns={["Conditions", "Role"]}
              rows={rm.rules.map((r) => ({
                Conditions: r.conditions,
                Role: r.role,
              }))}
            />
          </div>
        </>
      ) : (
        <p className="text-muted-foreground italic">
          No role mapping policy found.
        </p>
      )}
    </div>
  );
}
