import type { ConfigContext, ExpoConfig } from "@expo/config";

import { ClientEnv, Env } from "./env";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    slug: "SecureGuardPro",
    name: "SecureGuardPro",
    extra: {
        ...ClientEnv
    }
});
