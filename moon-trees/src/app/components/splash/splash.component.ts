import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'splash',
    styleUrls: ['./splash.component.less'],
    templateUrl: './splash.component.html'
})
export class SplashComponent implements OnInit {
    private isFirstView: boolean = false;

    constructor(private _cookieService: CookieService) { }

    ngOnInit() {
        let cookie = this.getCookie('isFirstView');
        if (cookie == '' || cookie === undefined) {
            this.isFirstView = true;
            this._cookieService.put('isFirstView', 'false');
        } else {
            this.isFirstView = false;
        }
        console.log('cookie', cookie);
    }
    getCookie(key: string) {
        return this._cookieService.get(key);
    }
}
