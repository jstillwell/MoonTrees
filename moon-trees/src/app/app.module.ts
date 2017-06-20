import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//components
import { TableComponent } from './components/table/table.component';
import { TreeCardComponent } from './components/cards/tree/tree.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { LocatorComponent } from './components/locator/locator.component';
import { TreeMapComponent } from './components/map/map.component';

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
        GeolocationService,
        TreeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
