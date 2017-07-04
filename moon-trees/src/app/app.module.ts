import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { CookieModule } from 'ngx-cookie';

//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { TreeCardComponent } from './components/cards/tree/tree.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { LocatorComponent } from './components/locator/locator.component';
import { TreeMapComponent } from './components/map/map.component';
import { SplashComponent } from './components/splash/splash.component';

import { AgmCoreModule } from '@agm/core';

//services
import { GeolocationService } from './services/geolocation/locator.service';
import { TreeService } from './services/trees/tree.service';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        ContactComponent,
        LocatorComponent,
        TableComponent,
        TreeCardComponent,
        TreeMapComponent,
        SplashComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        CookieModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDbh8SHuB2blR--0yahfxTyDq7kDn2wPzc'
        }),
        RouterModule.forRoot(rootRouterConfig, { useHash: true })
    ],
    providers: [
        GeolocationService,
        TreeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
