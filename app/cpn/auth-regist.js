/**
 * Created by ye on 2018/11/30.
 */
import { Cpn } from '../anotation/cpn';
import { api } from '../service/api';

@Cpn({
    selector: 'auth-regist',
    template: `
        <form>
            <div>
                <input placeholder="邮箱" name="email">
            </div>
            <div>
                <input class="captcha" placeholder="请从邮箱获取验证码" name="parssword"><span x-click="sendCaptcha" class="flR">获取验证码<span>
            </div>
            <div>
                <input placeholder="密码" name="password">
            </div>
            <div>
                <input placeholder="确认密码" name="password-confirm">
            </div>
            <div>
                <input placeholder="昵称" name="name">
            </div>
            <div>
                <input type="checkbox" name="agree"> 我阅读并同意了<a href="#">用户协议</a>
            </div>
            <div>
                <span class="btn-primary">注册</span>
            </div>
        </form>
    `,
    service: api
})
export class AuthRegist {
    sendCaptcha( event ) {
        let _ = this;
        let mailEl = _.el.querySelector( '[name="email"]' );

        return _.service.request( 'sendCaptcha', mailEl.value ).then( ( detail ) => {
            this.data.project = detail;
        })
    }
}