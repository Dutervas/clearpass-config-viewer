import { DataTable } from "@/components/DataTable";
import { StringList } from "@/components/StringList";
import type { ParsedService } from "@/lib/parseXml";

export function AuthorizationTab({ data }: { data: ParsedService }) {
  // O ClearPass mapeia automaticamente as fontes de autenticação como as fontes 
  // primárias de autorização. Vamos montar as linhas da tabela superior baseadas nisso.
  const primaryAuthzRows = data.authSources.map((source) => ({
    "Authentication Source": source,
    "Attributes Fetched From": source,
  }));

  return (
    <div className="space-y-8">
      {/* Tabela Superior: Fontes primárias (espelho da autenticação) */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground mb-3">
          Authorization sources from which role mapping attributes are fetched (for each Authentication Source)
        </h3>
        <DataTable
          columns={["Authentication Source", "Attributes Fetched From"]}
          rows={primaryAuthzRows}
          emptyMessage="No primary authorization sources mapped."
        />
      </div>

      {/* Lista Inferior: Fontes Adicionais */}
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground mb-3">
          Additional authorization sources from which to fetch role-mapping attributes -
        </h3>
        <div className="bg-card border border-border rounded p-4">
          <StringList
            title=""
            items={data.autzSources}
          />
        </div>
      </div>
    </div>
  );
}