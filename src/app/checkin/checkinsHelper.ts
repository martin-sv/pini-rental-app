import { CheckIn } from '../shared/models/checkIn.model';
import { OrderEnum } from './oderEnum';

export class CheckinsHelper {

  /**
  * @param count Number of elements to return (0 = all).
  */
  static getPropertyCheckins(checkins: CheckIn[], idProperty: string, order: OrderEnum = OrderEnum.ASC, count = 0): CheckIn[] {
    let returnCheckins: CheckIn[] = [];
    if (checkins != null) {
      checkins.forEach((checkin: CheckIn) => {
        if (checkin.idProperty === idProperty) { returnCheckins.push(checkin); }
      });

      returnCheckins = this.sortCheckins(returnCheckins, order);

      if (count > 0) {
        returnCheckins = returnCheckins.slice(0, count);
      }
    }
    return returnCheckins;
  }

  static sortCheckins(checkins: CheckIn[], order: OrderEnum = OrderEnum.ASC): CheckIn[] {

    checkins.sort((c1, c2) => {
      return (c1.checkingDateTime > c2.checkingDateTime) ? 1 : -1;
    });
    if (order === OrderEnum.DESC) {
      checkins.reverse();
    }
    return checkins;
  }

  static nextCheckin(checkins: CheckIn[], idProperty = null) {
    if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    if (checkins.length > 0) {
      this.sortCheckins(checkins);
      for (const checkin of checkins) {
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

  static lastCheckin(checkins: CheckIn[], idProperty = null) {
    if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    if (checkins.length > 0) {
      this.sortCheckins(checkins, OrderEnum.DESC);
      for (const checkin of checkins) {
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

  static nextCheckout(checkins: CheckIn[], idProperty = null) {
    if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    if (checkins.length > 0) {
      this.sortCheckins(checkins);
      for (const checkin of checkins) {
        const today = new Date();
        const datetoCheck = new Date(checkin.checkoutDateTime);
        if (datetoCheck > today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  static lastCheckout(checkins: CheckIn[], idProperty = null) {
    if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    if (checkins.length > 0) {
      this.sortCheckins(checkins, OrderEnum.DESC);
      for (const checkin of checkins) {
        const today = new Date();
        const datetoCheck = new Date(checkin.checkoutDateTime);
        if (datetoCheck < today) {
          return Object.create(checkin);
        }
      }
    }
    return '';
  }

  static available(checkins: CheckIn[], idProperty = null): boolean {
    if (idProperty !== null) { checkins = this.getPropertyCheckins(checkins, idProperty); }
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let nextOut = this.nextCheckout(checkins);
    let nextIn = this.nextCheckin(checkins);
    // if (nextOut === '') { nextOut = new CheckIn('0', '0', null, yesterday, yesterday, true); }
    // if (nextIn === '') { nextIn = new CheckIn('0', '0', null, yesterday, yesterday, true); }

    if (((nextOut).checkoutDateTime !== '' && ((nextIn).checkingDateTime !== '') {
      const no = new Date((nextOut as CheckIn).checkoutDateTime);
      const ni = new Date ((nextIn as CheckIn).checkingDateTime);
      if (no > new Date() && ni > new Date()) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
