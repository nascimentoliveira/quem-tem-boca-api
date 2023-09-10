import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

export function loadEnv() {
  const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
}
