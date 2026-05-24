type AppEnv = 'local' | 'develop' | 'homolog' | 'production';

const currentEnv = (process.env.NODE_ENV as AppEnv | undefined) ?? 'local';

const urlByEnv: Record<AppEnv, string> = {
    local: `http://localhost:5173`,
    develop: ``,
    homolog: ``,
    production: '',
};

export const urlEnv = urlByEnv[currentEnv] || `http://localhost:5173`;

const fromEnv: Record<AppEnv, string> = {
    local: ``,
    develop: ``,
    homolog: ``,
    production: ``,
};

const insertFrom = fromEnv[currentEnv];

export default {
    app_login_url: `${urlEnv}/login`,
    app_from_mail: insertFrom,
};
