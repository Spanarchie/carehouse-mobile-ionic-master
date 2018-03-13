import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {hostelService} from '../../providers/hostel-service-mock';
import {hostelDetailPage} from '../hostel-detail/hostel-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: hostelService) {
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(hostelDetailPage, favorite.hostel);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
