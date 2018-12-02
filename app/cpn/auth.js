/**
 * Created by ye on 2018/11/30.
 */
import { Cpn } from '../anotation/cpn';

@Cpn({
    selector: 'auth',
    template: `
        <div class="auth-box">
            <div class="auth-nav">
                <div class="on">
                    <span>登录</span>
                </div>
                <div>
                    <span>注册</span>
                </div>
            </div>
            <div>
                <auth-login class="hide"></auth-login>
                <auth-regist></auth-regist>
            <div>
        </div>
    `
})
export class Auth {}