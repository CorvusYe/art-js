/**
 * Created by ye on 2018/11/25.
 */
import { Cpn } from '../anotation/cpn';

@Cpn({
    selector: 'app',
    template: `
        <router></router>
    `
})
export class App {
    constructor() {
    }
}