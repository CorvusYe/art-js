/**
 * Created by ye on 2018/11/30.
 */
import { Cpn } from '../anotation/cpn';
import { api } from '../service/api';

@Cpn({
    selector: 'auth-login',
    template: `
        <form>
            <div>
                <input  placeholder="邮箱" name="email">
            </div>
            <div>
                <input  placeholder="密码" name="parssword">
            </div>
            <div>
                <a >忘记密码</a>
            </div>
            <div>
                <span class="btn-primary">登录</span>
            </div>
        </form>
    `,
    service: api
})
export class AuthLogin {}