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
    styleUrls: ['./map.component.less']
})
export class TreeMapComponent {
    lat: number;
    lng: number;
    position: Position;
    treeService: TreeService;
    trees: Observable<Tree[]>;
    filteredTrees: Tree[];
    locationService = new GeolocationService();
    isTableLoading: boolean;

    constructor(private http: Http) {
        this.treeService = new TreeService(http);
    }
    ngOnInit() {
        this.isTableLoading = false;
        this.trees = this.treeService.getTrees();
        
        this.locationService.getPosition().then((data) => {
            this.position = data;
            this.lat = data.coords.latitude;
            this.lng = data.coords.longitude;
        }).catch(function (err) {
            console.error(err);
        });
    }
    handlePositionChanged(e) {
        console.info("position changed", e);
    }
    handleSearchClicked(e) {
        this.isTableLoading = true;
    }
    handleResultsChanged(e) {
        this.isTableLoading = false;
        this.filteredTrees = e;
    }
}
