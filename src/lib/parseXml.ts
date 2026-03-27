export interface ParsedService {
  name: string;
  description: string;
  status: string;
  monitorMode: boolean;
  postureCompliance: boolean;
  auditEndHosts: boolean;
  profileEndpoints: boolean;
  useCachedResults: boolean;
  actionProfile: string;   // NOVO
  category: string;        // NOVO
  serviceRules: ServiceRule[];
  authMethods: string[];
  authSources: string[];
  stripUsername: boolean;
  stripRulesCsv: string;
  autzSources: string[];
  roleMappingName: string;
  roleMapping: RoleMappingData | null;
  enfPolicyName: string;
  enfPolicy: EnfPolicyData | null;
  acctProxyTargets: string[];
  acctFilterParams: AcctFilterParam[];
}

export interface ServiceRule {
  type: string;
  name: string;
  operator: string;
  value: string;
}

export interface RoleMappingData {
  name: string;
  defaultRole: string;
  evalAlgorithm: string;
  rules: RoleMappingRule[];
}

export interface RoleMappingRule {
  conditions: string;
  role: string;
}

export interface EnfPolicyData {
  name: string;
  defaultProfile: string;
  evalAlgorithm: string;
  rules: EnfPolicyRule[];
}

export interface EnfPolicyRule {
  conditions: string;
  profiles: string;
}

export interface AcctFilterParam {
  type: string;
  name: string;
  value: string;
}

function getTextList(parent: Element | null, tagName: string): string[] {
  if (!parent) return [];
  const items: string[] = [];
  const strings = parent.getElementsByTagName(tagName);
  for (let i = 0; i < strings.length; i++) {
    const text = strings[i].textContent?.trim();
    if (text) items.push(text);
  }
  return items;
}

function getAttr(el: Element | null, attr: string, fallback = ""): string {
  return el?.getAttribute(attr) ?? fallback;
}

function parseCondition(condEl: Element): string {
  const parts: string[] = [];
  const ruleAttrs = condEl.getElementsByTagName("RuleAttribute");
  for (let i = 0; i < ruleAttrs.length; i++) {
    const ra = ruleAttrs[i];
    const type = getAttr(ra, "type");
    const name = getAttr(ra, "name");
    const op = getAttr(ra, "operator");
    const val = getAttr(ra, "displayValue") || getAttr(ra, "value");
    parts.push(`${type}:${name} ${op} ${val}`);
  }
  return parts.join(" AND ") || "—";
}

export function parseXml(xmlString: string): ParsedService {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "application/xml");

  const svc = doc.getElementsByTagName("RadiusEnforcementService")[0] ?? null;

  const name = getAttr(svc, "name", "Unknown Service");
  const description = getAttr(svc, "description");
  
  const status = getAttr(svc, "enabled") === "true" ? "Enabled" : "Disabled";
  const monitorMode = getAttr(svc, "monitor") === "true";
  const postureCompliance = getAttr(svc, "postureEnabled") === "true";
  const auditEndHosts = getAttr(svc, "auditEnabled") === "true";
  const profileEndpoints = getAttr(svc, "profilerEnabled") === "true";
  const useCachedResults = getAttr(svc, "useCachedResults") === "true";
  
  // Novos campos extraídos
  const actionProfile = getAttr(svc, "actionProfileName", "—");
  const category = getAttr(svc, "categoryCsv", "—");

  // Service Rules
  const serviceRules: ServiceRule[] = [];
  const ruleExpr = svc?.getElementsByTagName("RuleExpression")[0];
  if (ruleExpr) {
    const attrs = ruleExpr.getElementsByTagName("RuleAttribute");
    for (let i = 0; i < attrs.length; i++) {
      const ra = attrs[i];
      serviceRules.push({
        type: getAttr(ra, "type"),
        name: getAttr(ra, "name"),
        operator: getAttr(ra, "operator"),
        value: getAttr(ra, "displayValue") || getAttr(ra, "value"),
      });
    }
  }

  // Auth
  const authMethodList = svc?.getElementsByTagName("AuthMethodNameList")[0] ?? null;
  const authMethods = getTextList(authMethodList, "string");

  const authSourceList = svc?.getElementsByTagName("AuthSourceNameList")[0] ?? null;
  const authSources = getTextList(authSourceList, "string");

  const stripUsername = getAttr(svc, "stripUsername") === "true";
  const stripRulesCsv = getAttr(svc, "stripRulesCsv");

  // Authorization
  const autzSourceList = svc?.getElementsByTagName("AutzSourceNameList")[0] ?? null;
  const autzSources = getTextList(autzSourceList, "string");

  // Role Mapping
  const roleMappingList = svc?.getElementsByTagName("RoleMappingNameList")[0] ?? null;
  const roleMappingNames = getTextList(roleMappingList, "string");
  const roleMappingName = roleMappingNames[0] ?? "";

  let roleMapping: RoleMappingData | null = null;
  if (roleMappingName) {
    const allRM = doc.getElementsByTagName("RoleMapping");
    for (let i = 0; i < allRM.length; i++) {
      if (getAttr(allRM[i], "name") === roleMappingName) {
        const rm = allRM[i];
        const rules: RoleMappingRule[] = [];
        const ruleEls = rm.getElementsByTagName("Rule");
        for (let j = 0; j < ruleEls.length; j++) {
          const rule = ruleEls[j];
          const cond = rule.getElementsByTagName("Condition")[0];
          const conditions = cond ? parseCondition(cond) : "—";
          const results = rule.getElementsByTagName("RuleResult");
          const roles: string[] = [];
          for (let k = 0; k < results.length; k++) {
            roles.push(getAttr(results[k], "displayValue") || getAttr(results[k], "value"));
          }
          rules.push({ conditions, role: roles.join(", ") || "—" });
        }
        roleMapping = {
          name: roleMappingName,
          defaultRole: getAttr(rm, "dftRoleName"),
          evalAlgorithm: getAttr(rm, "ruleCombineAlgo"),
          rules,
        };
        break;
      }
    }
  }

  // Enforcement
  const enfPolicyList = svc?.getElementsByTagName("EnfPolicyNameList")[0] ?? null;
  const enfPolicyNames = getTextList(enfPolicyList, "string");
  const enfPolicyName = enfPolicyNames[0] ?? "";

  let enfPolicy: EnfPolicyData | null = null;
  if (enfPolicyName) {
    const allEP = doc.getElementsByTagName("EnforcementPolicy");
    for (let i = 0; i < allEP.length; i++) {
      if (getAttr(allEP[i], "name") === enfPolicyName) {
        const ep = allEP[i];
        const rules: EnfPolicyRule[] = [];
        const ruleEls = ep.getElementsByTagName("Rule");
        for (let j = 0; j < ruleEls.length; j++) {
          const rule = ruleEls[j];
          const cond = rule.getElementsByTagName("Condition")[0];
          const conditions = cond ? parseCondition(cond) : "—";
          const results = rule.getElementsByTagName("RuleResult");
          const profiles: string[] = [];
          for (let k = 0; k < results.length; k++) {
            profiles.push(getAttr(results[k], "displayValue") || getAttr(results[k], "value"));
          }
          rules.push({ conditions, profiles: profiles.join(", ") || "—" });
        }
        enfPolicy = {
          name: enfPolicyName,
          defaultProfile: getAttr(ep, "defaultProfileName"),
          evalAlgorithm: getAttr(ep, "ruleCombiningAlgorithm"),
          rules,
        };
        break;
      }
    }
  }

  // Accounting
  const acctProxyList = svc?.getElementsByTagName("AcctProxyTargetNameList")[0] ?? null;
  const acctProxyTargets = getTextList(acctProxyList, "string");

  const acctFilterList = svc?.getElementsByTagName("AcctFilterParamList")[0] ?? null;
  const acctFilterParams: AcctFilterParam[] = [];
  if (acctFilterList) {
    const conds = acctFilterList.getElementsByTagName("RulesCondition");
    for (let i = 0; i < conds.length; i++) {
      const c = conds[i];
      acctFilterParams.push({
        type: getAttr(c, "type"),
        name: getAttr(c, "name"),
        value: getAttr(c, "displayValue") || getAttr(c, "value"),
      });
    }
  }

  return {
    name, description, status, monitorMode, postureCompliance, 
    auditEndHosts, profileEndpoints, useCachedResults, actionProfile, category,
    serviceRules, authMethods, authSources, stripUsername, stripRulesCsv, autzSources, 
    roleMappingName, roleMapping, enfPolicyName, enfPolicy, 
    acctProxyTargets, acctFilterParams,
  };
}