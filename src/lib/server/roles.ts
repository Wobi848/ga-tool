/**
 * Role-Hierarchie:
 *   systemadmin > admin > user (null/undefined)
 *
 * - systemadmin: erster User der sich registriert. Kann nicht geaendert,
 *   gebannt oder geloescht werden. Recovery nur per DB-Zugriff (siehe
 *   DEPLOYMENT.md).
 * - admin: vom systemadmin/admin vergeben. Vollzugriff auf User-Verwaltung
 *   ausser systemadmin-Zeilen.
 * - user: default fuer alle weiteren Registrierungen.
 */

export type AppRole = 'user' | 'admin' | 'systemadmin';

export const ALL_ROLES: readonly AppRole[] = ['user', 'admin', 'systemadmin'] as const;

export function isSystemAdmin(role: string | null | undefined): boolean {
	return role === 'systemadmin';
}

export function isAdminOrAbove(role: string | null | undefined): boolean {
	return role === 'admin' || role === 'systemadmin';
}

/** Roles die ein Admin im UI vergeben/aendern darf (systemadmin nicht enthalten). */
export const ASSIGNABLE_ROLES: readonly AppRole[] = ['user', 'admin'] as const;

export function isAssignableRole(role: string): role is 'user' | 'admin' {
	return role === 'user' || role === 'admin';
}
