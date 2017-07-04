import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { TreeService } from '../../services/trees/tree.service';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import { GeolocationService } from '../../services/geolocation/locator.service';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
    selector: 'tree-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class TreeMapComponent {
    lat: number;
    lng: number;
    treeService: TreeService;
    trees: Observable<Tree[]>;
    filteredTrees: Tree[];
    locationService = new GeolocationService();
    subscription: Subscription;

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
    }
    ngOnInit() {
        this.trees = this.treeService.getTrees();
        
        this.locationService.getPosition().then((data) => {
            this.lat = data.coords.latitude;
            this.lng = data.coords.longitude;
        }).catch(function (err) {
            console.error(err);
        });
    }
    handlePositionChanged(e) {
        console.info("position changed", e);
    }
    handleResultsChanged(e) {
        this.filteredTrees = e;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
