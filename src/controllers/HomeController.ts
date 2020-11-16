import { Callback, Endpoint } from '@reste/x';

export class HomeController {

    @Endpoint()
    public home(callback: Callback) {
        callback.response.send('homepage')
    }
}
