import { environment } from '@/environment';
import { vectorTilesetSource } from '@deck.gl/carto';

const SOCIODEMOGRAPHIC_USA_TABLE_NAME = 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup';
const SOCIODEMOGRAPHIC_USA_CONNECTION_NAME = 'carto_dw';

export function getSociodemographicUsaSource(): ReturnType<typeof vectorTilesetSource> {
  return vectorTilesetSource({
    apiBaseUrl: environment.VITE_CARTO_API_BASE_URL,
    accessToken: environment.VITE_CARTO_API_TOKEN,
    connectionName: SOCIODEMOGRAPHIC_USA_CONNECTION_NAME,
    tableName: SOCIODEMOGRAPHIC_USA_TABLE_NAME,
  });
}
