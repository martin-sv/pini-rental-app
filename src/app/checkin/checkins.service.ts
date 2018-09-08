import { CheckIn } from '../shared/models/checkIn.model';
import { OrderEnum } from './oderEnum';
import { PropertiesService } from '../properties/properties.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckinsService {
  checkins: CheckIn[];

  constructor(private propertiesService: PropertiesService) {
    propertiesService.checkinsUpdate.subscribe((checkins: CheckIn[]) => {
      this.checkins = checkins;
    });
  }
  /**
  * @param count Number of elements to return (0 = all).
  */
  getPropertyCheckins(idProperty: string, order: OrderEnum = OrderEnum.ASC, count = 0): CheckIn[] {
    let returnCheckins: CheckIn[] = [];
    if (this.checkins != null) {
      this.checkins.forEach((checkin: CheckIn) => {
        if (checkin.idProperty === idProperty) { returnCheckins.push(checkin); }
      });

      returnCheckins = this.sortCheckins(returnCheckins, order);

      if (count > 0) {
        returnCheckins = returnCheckins.slice(0, count);
      }
    }
    return returnCheckins;
  }

  sortCheckins(checkins: CheckIn[], order: OrderEnum = OrderEnum.ASC): CheckIn[] {
    checkins.sort((c1, c2) => {
      return (c1.checkingDateTime > c2.checkingDateTime) ? 1 : -1;
    });
    if (order === OrderEnum.DESC) {
      checkins.reverse();
    }
    return checkins;
  }

  nextCheckin(idProperty = null) {
    // if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    const propertyCheckins = this.getPropertyCheckins(idProperty);
    if (propertyCheckins.length > 0) {
      this.sortCheckins(propertyCheckins);
      for (const checkin of propertyCheckins) {
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        const today = new Date();
        const datetoCheck = new Date(checkin.checkingDateTime);
        if (datetoCheck > today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  lastCheckin(idProperty = null) {
    // if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    const propertyCheckins = this.getPropertyCheckins(idProperty);
    if (propertyCheckins.length > 0) {
      this.sortCheckins(propertyCheckins, OrderEnum.DESC);
      for (const checkin of propertyCheckins) {
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        const today = new Date();
        const datetoCheck = new Date(checkin.checkingDateTime);
        if (datetoCheck < today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  nextCheckout(idProperty = null) {
    // if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    const propertyCheckins = this.getPropertyCheckins(idProperty);
    if (propertyCheckins.length > 0) {
      this.sortCheckins(propertyCheckins);
      for (const checkin of propertyCheckins) {
        const today = new Date();
        const datetoCheck = new Date(checkin.checkoutDateTime);
        if (datetoCheck > today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  lastCheckout(idProperty = null) {
    // if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    const propertyCheckins = this.getPropertyCheckins(idProperty);
    if (propertyCheckins.length > 0) {
      this.sortCheckins(propertyCheckins, OrderEnum.DESC);
      for (const checkin of propertyCheckins) {
        const today = new Date();
        const datetoCheck = new Date(checkin.checkoutDateTime);
        if (datetoCheck < today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  available(idProperty): boolean {
    return (this.currentGuest(idProperty) === '') ? true : false;
  }

  currentGuest(idProperty) {
    // checkins = this.getPropertyCheckins(checkins, idProperty);
    const propertyCheckins = this.getPropertyCheckins(idProperty);
    for (const checkin of propertyCheckins) {
      const checkingDateTime = new Date(checkin.checkingDateTime);
      const checkoutDateTime = new Date(checkin.checkoutDateTime);
      if (checkingDateTime < new Date() && checkoutDateTime > new Date()) {
        return checkin.guest;
      }
    }
    return '';
  }
}
