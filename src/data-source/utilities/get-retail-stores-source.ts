import { environment } from '@/environment';
import { vectorTableSource } from '@deck.gl/carto';

const RETAIL_STORES_TABLE_NAME = 'carto-demo-data.demo_tables.retail_stores';
const RETAIL_STORES_CONNECTION_NAME = 'carto_dw';

export function getRetailStoresSource(): ReturnType<typeof vectorTableSource> {
  return vectorTableSource({
    apiBaseUrl: environment.VITE_CARTO_API_BASE_URL,
    accessToken: environment.VITE_CARTO_API_TOKEN,
    connectionName: RETAIL_STORES_CONNECTION_NAME,
    tableName: RETAIL_STORES_TABLE_NAME,
  });
}
