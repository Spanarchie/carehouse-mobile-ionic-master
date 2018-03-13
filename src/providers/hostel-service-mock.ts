import {Injectable} from '@angular/core';
import properties from './mock-properties';

@Injectable()
export class hostelService {

  favoriteCounter: number = 0;
  favorites: Array<any> = [];

  findAll() {
    return Promise.resolve(properties);
  }

  findById(id) {
    return Promise.resolve(properties[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(properties.filter((hostel: any) =>
        (hostel.title +  ' ' +hostel.address +  ' ' + hostel.city + ' ' + hostel.description).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(hostel) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, hostel: hostel});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }

}
