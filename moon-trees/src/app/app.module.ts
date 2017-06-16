import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TableComponent } from './table/table.component';
import { TreeCardComponent } from './cards/tree/tree.component';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { LocatorComponent } from './locator/locator.component';
import { TreeMapComponent } from './map/map.component';
import { GeolocationService } from './geolocation/locator.service';

import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        ContactComponent,
        LocatorComponent,
        TableComponent,
        TreeCardComponent,
        TreeMapComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDbh8SHuB2blR--0yahfxTyDq7kDn2wPzc'
        }),
        RouterModule.forRoot(rootRouterConfig, { useHash: true })
    ],
    providers: [
        GeolocationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
