const mapping: Record<string, string> = {
  'content-suggestions': 'content_suggestion',
  integrations: 'integration',
  keywords: 'keyword',
  'pencraft-pros': 'pencraft_pro',
  performances: 'performance',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
