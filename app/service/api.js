/**
 * Created by ye on 2018/11/27.
 */
import { Http } from './http';

export const api = new Http( {
    api: {
        /** @example */
        token: { url: window.baseUrl+ '/auth/token', type: 'post' },
        index: { url: window.baseUrl+ '/project/index', type: 'post' },
        captcha: { url: window.baseUrl+ '/auth/captcha', type: 'post' },
        register: { url: window.baseUrl+ '/auth/register', type: 'post' },
        discussForProject: { url: window.baseUrl+ '/discuss/for-project', type: 'post' }
    }
} );